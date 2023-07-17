import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest, { params }: any) {
  try {
    console.log("✅ GET: /api/projects/[projectId]/tags");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const project = await prisma.project.findFirst({
      where: {
        slug: params.projectId,
      },
      select: {
        id: true,
      },
    });

    if (!project) {
      return createResponse("error", "Project not found", null, 404);
    }

    const tags = await prisma.tag.findMany({
      where: {
        projects: {
          some: {
            id: project.id,
          },
        },
      },
    });

    return createResponse("ok", null, tags, 200);
  } catch (error) {
    return createResponse("error", "Tag find failed", null, 500);
  }
}
