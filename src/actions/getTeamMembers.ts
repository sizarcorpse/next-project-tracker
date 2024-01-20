import { prisma } from "@/libs/prisma";

export default async function getTeamMembers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            role: {
              name: "PROJECT MANAGER",
            },
          },
          {
            role: {
              name: "TEAM MEMBER",
            },
          },
        ],
      },
      select: {
        id: true,
        image: true,
        username: true,
        role: {
          select: {
            name: true,
          },
        },
        profile: {
          select: {
            designation: true,
            company: true,
            gender: true,
          },
        },
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
