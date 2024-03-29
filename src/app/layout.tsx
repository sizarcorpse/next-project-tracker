import { getUserServerSession } from "@/actions";
import { AppBar } from "@/components/appBar";
import { Footer } from "@/components/footer/";
import { ThemeProvider } from "@/providers/";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import "@/styles/globals.css";
import { Session } from "next-auth";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth Boilerplate",
  description: "Next Auth Boilerplate with Tailwind CSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = ((await getUserServerSession()) as Session) || {};
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <ToasterProvider />
            <div className="grid h-screen grid-rows-layout">
              <AppBar user={user} />
              <main>{children}</main>
              <Footer />
            </div>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
