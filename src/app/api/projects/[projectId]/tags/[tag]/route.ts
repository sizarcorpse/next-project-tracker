import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createResponse } from "@/utils/";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    console.log("✅ DELETE: /api/projects/:project/tags/:tag");

    const session = await getServerSession(authOptions);
    if (!session) {
      return createResponse("error", "Unauthorized", null, 401);
    }

    const tag = await prisma.tag.delete({
      where: {
        id: params.tag,
      },
      select: {
        id: true,
      },
    });

    return createResponse("ok", null, tag, 200);
  } catch (error) {
    return createResponse("error", "Tag delete failed", null, 500);
  }
}
