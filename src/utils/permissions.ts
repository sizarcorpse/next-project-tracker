import { prisma } from "@/libs/prisma";

export const hasPermission = async (
  userId: string,
  requiredPermissions: string[]
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: { include: { permissions: true } } },
    });

    if (!user || !user.role || !user.role.permissions) {
      throw new Error("User or user permissions not found");
    }

    const userPermissions = user.role.permissions.map(
      (permission) => permission.name
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    return hasPermission;
  } catch (error: any) {
    throw error;
  }
};

export const CREATE_USER_PERMISSION = "create:user";
export const READ_USER_PERMISSION = "read:user";
export const UPDATE_USER_PERMISSION = "update:user";
export const DELETE_USER_PERMISSION = "delete:user";

export const CREATE_PROFILE_PERMISSION = "create:profile";
export const READ_PROFILE_PERMISSION = "read:profile";
export const UPDATE_PROFILE_PERMISSION = "update:profile";
export const DELETE_PROFILE_PERMISSION = "delete:profile";

export const CREATE_ROLE_PERMISSION = "create:role";
export const READ_ROLE_PERMISSION = "read:role";
export const UPDATE_ROLE_PERMISSION = "update:role";
export const DELETE_ROLE_PERMISSION = "delete:role";

export const CREATE_PERMISSION_PERMISSION = "create:permission";
export const READ_PERMISSION_PERMISSION = "read:permission";
export const UPDATE_PERMISSION_PERMISSION = "update:permission";
export const DELETE_PERMISSION_PERMISSION = "delete:permission";

export const CREATE_PROJECT_PERMISSION = "create:project";
export const READ_PROJECT_PERMISSION = "read:project";
export const UPDATE_PROJECT_PERMISSION = "update:project";
export const DELETE_PROJECT_PERMISSION = "delete:project";
