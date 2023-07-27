import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    console.log("✅ GET: /api/projects");

    const session = await getServerSession(authOptions);

    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const params = req.nextUrl.searchParams;

    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 30;
    const sort = params.get("sort") || "title";
    const order = params.get("startDate") || "asc";

    const projects = await prisma.project.findMany({
      include: {
        createdBy: {
          select: {
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
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    });
    const total = await prisma.project.count();

    return createResponse("ok", null, { projects, total }, 200);
  } catch (error) {
    return createResponse("error", "Technology create failed", null, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("✅ POST: /api/projects");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const body = await req.json();
    const { title, type, priority, visibility, stage } = body;
    const slug = slugify(title, { lower: true });

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [{ title: title }, { slug: slug }],
      },
    });

    if (existingProject) {
      return createResponse("error", "Project already exists", null, 409);
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        type,
        priority,
        visibility,
        stage,
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
        members: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return createResponse("success", "Project created", project, 201);
  } catch (error: any) {
    return createResponse("error", "Technology create failed", null, 500);
  }
}
