"use server";

import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { CREATE_PROJECT_PERMISSION, hasPermission } from "@/utils/permissions";
import {
  CreateProjectRequest,
  createProjectValidation,
} from "@/validators/project";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

function uppercase(value: any) {
  return value ? value.toUpperCase() : value;
}

export async function createProject(payload: CreateProjectRequest) {
  try {
    const session = await getUserServerSession();
    if (!session) {
      return {
        status: "unauthenticated",
        message: "User not authenticated",
      };
    }
    const user = session.user;

    const hp = await hasPermission(user.id, [CREATE_PROJECT_PERMISSION]);
    if (!hp) {
      return {
        status: "unauthorized",
        message: "Permission denied",
      };
    }

    const v = createProjectValidation.safeParse(payload);
    if (!v.success) {
      return {
        status: "invalid",
        message: "Invalid project data",
      };
    }

    const slug = slugify(v.data.title, { lower: true });

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [{ title: v.data.title }, { slug: slug }],
      },
    });

    if (existingProject) {
      return {
        status: "error",
        message: "Project already exists",
      };
    }

    const project = await prisma.project.create({
      data: {
        title: v.data.title,
        slug: slug,
        type: uppercase(v.data.type),
        priority: uppercase(v.data.priority),
        visibility: uppercase(v.data.visibility),
        stage: uppercase(v.data.stage),
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/projects");
    return {
      status: "ok",
      message: "Project created",
      data: project,
    };
  } catch (error: any) {
    throw error;
  }
}
