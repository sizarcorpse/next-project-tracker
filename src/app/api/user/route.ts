import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("✅ GET: /api/user");

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

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: user,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User not found",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    console.log("✅ PATCH: /api/user");

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
    const { name, image, email, username } = body;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username:
              session?.user?.username === username ? undefined : username,
          },
          {
            email: session?.user?.email === email ? undefined : email,
          },
        ],
      },
    });

    if (userExists) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Username or email is already taken",
        }),
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name,
        email,
        username,
        image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: user,
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
