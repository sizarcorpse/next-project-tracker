"use server";

import { getUserServerSession } from "@/actions";
import { prisma } from "@/libs/prisma";
import { UPDATE_PROFILE_PERMISSION, hasPermission } from "@/utils/permissions";
import { ProfileValidator } from "@/validators/profile";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof ProfileValidator>;

const updateUserProfile = async (data: Inputs) => {
  console.log("|🚀|action:`updateUserProfile`");

  try {
    const session = await getUserServerSession();
    const user = session?.user;
    if (!user) throw new Error("User not found");

    const hp = await hasPermission(user.id, [UPDATE_PROFILE_PERMISSION]);
    if (!hp) throw new Error("User has no permission to update profile");

    const v = ProfileValidator.safeParse(data);
    if (!v.success) {
      throw new Error("Invalid profile data");
    }

    const profile = await prisma.profile.update({
      where: {
        userId: session?.user?.id,
      },
      data: {
        designation: v.data.designation,
        company: v.data.company,
        website: v.data.website,
        location: v.data.location,
        publicEmail: v.data.publicEmail,
        publicPhone: v.data.publicPhone,
        gender: v.data.gender,
        pronouns: v.data.pronouns,
        headline: v.data.headline,
        biography: v.data.biography,
        dateOfBirth: v.data.dateOfBirth,
        linkedin: v.data.linkedin,
        github: v.data.github,
        twitter: v.data.twitter,
        facebook: v.data.facebook,
        instagram: v.data.instagram,
        discord: v.data.discord,
      },
    });

    if (!profile) {
      throw new Error("Profile update failed");
    }

    revalidatePath("/u/profile/settings");
    return { status: "ok", data: profile };
  } catch (error: any) {
    return { status: "error", error: error.message };
  }
};

export default updateUserProfile;
