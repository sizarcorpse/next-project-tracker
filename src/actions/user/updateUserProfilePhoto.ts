"use server";

import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { hasPermission, UPDATE_USER_PERMISSION } from "@/utils/permissions";
import { utapi } from "@/utils/server/uploadthing";
import { revalidatePath } from "next/cache";

type UploadthingRes = {
  key: string;
  url: string;
  name: string;
  size: number;
};

async function updateUserProfilePhoto(image: UploadthingRes) {
  try {
    const userSession = await getUserServerSession();
    const user = userSession?.user;
    if (!user) throw new Error("User not found");

    const hp = await hasPermission(user.id, [UPDATE_USER_PERMISSION]);
    if (!hp) throw new Error("User has no permission to update profile");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: image.url,
      },
    });

    revalidatePath("/u/profile/");
    return { status: "ok", message: "Profile photo updated" };
  } catch (error: any) {
    await utapi.deleteFiles(image.key);
    return { status: "error", message: error.message };
  }
}

export default updateUserProfilePhoto;
