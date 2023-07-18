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

export async function POST(req: NextRequest, { params }: any) {
  try {
    console.log("✅ POST: /api/projects/[projectId]/tags");

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

    const body = await req.json();

    if (!body.name.startsWith("#")) {
      body.name = `#${body.name}`;
    }
    body.name = body.name.replace(/\s/g, "");
    const slug = slugify(body.name, { lower: true });

    const tag = await prisma.tag.create({
      data: {
        name: body.name,
        slug: slug,
        projects: {
          connect: {
            id: project.id,
          },
        },
      },
    });

    return createResponse("ok", null, tag, 200);
  } catch (error) {
    console.log(error);
    return createResponse("error", "Tag create failed", null, 500);
  }
}
