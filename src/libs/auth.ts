import { prisma } from "@/libs/prisma";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

type UT = {
  session: {
    id: String;
    name: String;
    email: String;
    image: String;
    username: String;
  };
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          !user ||
          !(await compare(credentials.password, user.password as string))
        ) {
          throw new Error("Invalid credentials");
        }

        // user
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          uxdi: "🚀",
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: () => {
      return true;
    },

    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      const u = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
        include: {
          profile: true,
        },
      });

      if (!u) {
        token.id = user.id;
        return token;
      }

      if (!u.username || u.username === null) {
        await prisma.user.update({
          where: {
            id: u.id,
          },
          data: {
            username: u.email?.split("@")[0],
          },
        });
      }

      if (!u.profile || u.profile === null) {
        await prisma.profile.create({
          data: {
            user: {
              connect: {
                id: u.id,
              },
            },
          },
        });
      }
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        picture: u.image,
        username: u.username,
      };
    },
  },
};
