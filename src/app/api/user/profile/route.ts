import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

interface Session {
  user: {
    name: string;
    email: string;
    image?: string;
    id: string;
    uxdi: string;
  };
  accessToken: string;
}

export async function GET(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session;

    console.log(session);

    if (!session) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });

    if (!profile) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Profile not found",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: profile,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
  }
}
