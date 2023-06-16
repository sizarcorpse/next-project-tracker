import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { ProfileValidator } from "@/validators/profile";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function GET() {
  try {
    console.log("✅ GET: /api/user/profile");

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

export async function PATCH(request: Request) {
  try {
    console.log("✅ PATCH: /api/user/profile");

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

    const body = await request.json();
    const result = ProfileValidator.parse(body);

    const profile = await prisma.profile.update({
      where: {
        userId: session?.user?.id,
      },
      data: {
        ...result,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: profile,
        message: "Profile updated successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          type: "ZodError",
          message: error.issues[0].message,
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Profile update failed",
      }),
      { status: 500 }
    );
  }
}
