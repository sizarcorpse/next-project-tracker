import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("✅ GET: /api/members");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const params = req.nextUrl.searchParams;
    const name = params.get("name") || "";
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 2;
    const sort = params.get("sort") || "username";
    const order = params.get("order") || "asc";
    const skip = (page - 1) * limit;

    const members = await prisma.user.findMany({
      select: {
        id: true,
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
      where: {
        username: {
          contains: name,
        },
      },
      skip,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    });

    return createResponse("ok", null, members, 200);
  } catch (error) {
    return createResponse("error", "Members not found", null, 500);
  }
}
