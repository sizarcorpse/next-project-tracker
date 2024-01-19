"use client";

import { UpdateProfilePhoto } from "@/components/user/";
import Image from "next/image";

interface ProfilePhotoProps {
  image?: string | null;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ image }) => {
  return (
    <div className="group relative">
      <figure>
        <Image
          src={image || "/assets/images/default-avatar.jpeg"}
          alt="Profile Photo"
          width={296}
          height={296}
          className="rounded-full aspect-square object-cover w-24 sm:w-32 md:w-72"
        />
      </figure>
      <div className="hidden absolute bottom-4 left-0 right-0 group-hover:flex items-center justify-center">
        <UpdateProfilePhoto />
      </div>
    </div>
  );
};

export default ProfilePhoto;
