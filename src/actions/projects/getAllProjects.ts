"use server";

import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { hasPermission, READ_PROJECT_PERMISSION } from "@/utils/permissions";
import { Prisma, ProjectStatus } from "@prisma/client";
import { unstable_cache } from "next/cache";

const validSortFields = [
  "title",
  "startDate",
  "endDate",
  "type",
  "priority",
  "stage",
] as const;
const validOrderFields = ["asc", "desc"] as const;
const validTypeFields = [
  "web",
  "app",
  "game",
  "desktop",
  "api",
  "library",
  "other",
  "hardware",
] as const;
const validPriorityFields = [
  "lowest",
  "low",
  "medium",
  "high",
  "highest",
] as const;
const validStageFields = [
  "concept",
  "planning",
  "design",
  "development",
  "testing",
  "deployment",
  "maintenance",
] as const;

type ProjectQueryParams = {
  sort?: (typeof validSortFields)[number];
  order?: (typeof validOrderFields)[number];
  type?: (typeof validTypeFields)[number];
  priority?: (typeof validPriorityFields)[number];
  stage?: (typeof validStageFields)[number];
  status?: "active" | "archived" | "inactive" | undefined;
  si?: "me" | "assigned" | "all" | undefined;
  page?: number | undefined;
  search?: string | undefined;
  limit?: number | undefined;
};

function validateField(
  field: string | undefined,
  validFields: readonly string[],
  fieldName: string
) {
  if (field && !validFields.includes(field)) {
    throw new Error(
      `Invalid ${fieldName} field: ${field}. Valid fields are: ${validFields.join(
        ", "
      )}`
    );
  }
}

export const getAllProjects = unstable_cache(
  async (query: ProjectQueryParams) => {
    try {
      const session = await getUserServerSession();
      if (!session) {
        return {
          status: "unauthenticated",
          message: "You must be logged in to perform this action.",
        };
      }
      const user = session.user;

      const hp = await hasPermission(user.id, [READ_PROJECT_PERMISSION]);
      if (!hp) {
        return {
          status: "unauthorized",
          message: "You do not have permission to perform this action.",
        };
      }

      const {
        sort,
        order,
        stage,
        priority,
        type,
        status,
        si,
        page,
        search,
        limit,
      } = query;

      const _limit = limit || 10;
      const _page = page || 1;
      const _skip = (_page - 1) * _limit;

      const DEFAULT_SORT_FIELD = "title";
      const DEFAULT_ORDER = "asc";

      validateField(sort, validSortFields, "sort");
      validateField(order, validOrderFields, "order");
      validateField(type, validTypeFields, "type");
      validateField(priority, validPriorityFields, "priority");
      validateField(stage, validStageFields, "stage");
      validateField(status, ["active", "archived", "inactive"], "status");
      validateField(si, ["me", "assigned", "all"], "si");

      const filter: Prisma.ProjectWhereInput = {
        NOT: {
          status: "DRAFT",
        },
      };

      switch (si) {
        case "me":
          filter.createdBy = { id: user.id };
          filter.visibility = { in: ["PUBLIC", "PRIVATE"] };
          break;
        case "assigned":
          filter.members = { some: { id: user.id } };
          filter.visibility = { in: ["PUBLIC", "PRIVATE"] };
          break;
        case "all":
          filter.visibility = { in: ["PUBLIC"] };
          break;
        default:
          filter.createdBy = { id: user.id };
          filter.members = { some: { id: user.id } };
          filter.visibility = "PUBLIC";
          break;
      }

      if (status) {
        filter.status = status.toUpperCase() as ProjectStatus;
      }

      if (type) {
        filter.type = {
          in: Array.isArray(type)
            ? type.map((t) => t.toUpperCase())
            : [type.toUpperCase()],
        };
      }

      if (priority) {
        filter.priority = {
          in: Array.isArray(priority)
            ? priority.map((p) => p.toUpperCase())
            : [priority.toUpperCase()],
        };
      }

      if (stage) {
        filter.stage = {
          in: Array.isArray(stage)
            ? stage.map((s) => s.toUpperCase())
            : [stage.toUpperCase()],
        };
      }

      const projects = await prisma.project.findMany({
        where: filter,
        orderBy: {
          [sort || DEFAULT_SORT_FIELD]: order || DEFAULT_ORDER,
        },
        take: parseInt(_limit.toString()),
        skip: parseInt(_skip.toString()),
      });

      return {
        status: "ok",
        data: projects,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: error.message,
      };
    }
  },
  ["getAllProjects"]
);
