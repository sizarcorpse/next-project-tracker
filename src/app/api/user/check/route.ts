import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("✅ GET: /api/user/check?");
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const params = new URL(req.url).searchParams;
    const { username, email } = Object.fromEntries(params);
    const query: any = {};

    if (username) {
      query.username = username;
    }
    if (email) {
      query.email = email;
    }

    const user = await prisma.user.findFirst({
      where: query,
      select: {
        username: true,
        email: true,
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          status: "ok",
          data: false,
        }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: true,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User not found",
      }),
      { status: 500 }
    );
  }
}
