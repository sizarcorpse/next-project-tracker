import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function getTeamMembers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        image: true,
        username: true,
        role: true,
        profile: {
          select: {
            designation: true,
            company: true,
            linkedin: true,
            twitter: true,
            github: true,
            instagram: true,
            facebook: true,
            gender: true,
          },
        },
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
