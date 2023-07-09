import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("✅ GET: /api/technologies");

    const params = req.nextUrl.searchParams;

    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 30;
    const sort = params.get("sort") || "name";
    const order = params.get("order") || "asc";
    const skip = (page - 1) * limit;

    const technologies = await prisma.technology.findMany({
      skip,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    });
    const total = await prisma.technology.count();

    return createResponse("ok", null, { technologies, total }, 200);
  } catch (error: any) {
    return createResponse("error", "Technology not found", null, 500);
  }
}
