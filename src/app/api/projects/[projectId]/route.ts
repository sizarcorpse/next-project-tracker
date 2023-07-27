import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import slugify from "slugify";

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
      },
      include: {
        createdBy: {
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
        },
        technologies: true,
        members: {
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
        },
      },
    });

    return createResponse("ok", null, project, 200);
  } catch (error) {
    return createResponse("error", "Technology create failed", null, 500);
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    console.log("✅ PATCH: /api/projects/:project");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const isProjectExits = await prisma.project.findFirst({
      where: {
        id: params.projectId,
      },
      select: {
        id: true,
      },
    });

    if (!isProjectExits) {
      return createResponse("error", "Project not found", null, 404);
    }

    const body = await req.json();

    const slug = body.title && slugify(body.title, { lower: true });
    body.slug = slug;

    const project = await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        type: body.type,
        priority: body.priority,
        visibility: body.visibility,
        stage: body.stage,
        status: body.status,
        endDate: body.endDate,
        figmaLink: body.figmaLink,
        githubLink: body.githubLink,
        devLink: body.devLink,
        liveLink: body.liveLink,
        content: body.content,
        technologies: {
          set: body.technologies,
        },
        members: {
          set: body.members,
        },
      },
      include: {
        members: {
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
        },
        technologies: true,
      },
    });

    return createResponse("ok", null, project, 200);
  } catch (error) {
    return createResponse("error", "Project update failed", null, 500);
  }
}
