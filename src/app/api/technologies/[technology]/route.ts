import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("✅ GET: /api/technologies/[technology]");

    return createResponse("ok", null, { data: "ok" }, 200);
  } catch (error: any) {
    return createResponse("error", "Technology not found", null, 500);
  }
}
