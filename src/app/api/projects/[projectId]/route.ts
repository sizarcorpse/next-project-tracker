import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    console.log("✅ GET: /api/projects/:project");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const project = await prisma.project.findFirst({
      where: {
        slug: params.projectId,
        createdByUserId: session.user.id,
      },
    });

    return createResponse("ok", null, project, 200);
  } catch (error) {
    return createResponse("error", "Technology create failed", null, 500);
  }
}
