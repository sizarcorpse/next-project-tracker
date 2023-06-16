import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

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
    return new NextResponse(
      JSON.stringify({
        status: "error",
        data: "Profile not found",
      }),
      { status: 500 }
    );
  }
}
