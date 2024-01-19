import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "create:profile",
    "read:profile",
    "update:profile",
    "delete:profile",
    "create:role",
    "read:role",
    "update:role",
    "delete:role",
    "create:permission",
    "read:permission",
    "update:permission",
    "delete:permission",
    "create:project",
    "read:project",
    "update:project",
    "delete:project",
  ];

  const roles = [
    { name: "GUEST", permissions: ["read:user", "read:profile"] },
    {
      name: "USER",
      permissions: [
        "read:user",
        "update:user",
        "delete:user",
        "read:profile",
        "update:profile",
        "delete:profile",
      ],
    },
    { name: "ADMIN", permissions: permissions },
  ];

  for (const permissionName of permissions) {
    await prisma.permission.upsert({
      where: { name: permissionName },
      update: {},
      create: { name: permissionName },
    });
  }

  for (const role of roles) {
    const rolePermissions = await prisma.permission.findMany({
      where: {
        name: {
          in: role.permissions,
        },
      },
    });

    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        permissions: {
          set: rolePermissions.map((permission) => ({
            permissionId: permission.permissionId,
          })),
        },
      },
      create: {
        name: role.name,
        permissions: {
          connect: rolePermissions.map((permission) => ({
            permissionId: permission.permissionId,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
