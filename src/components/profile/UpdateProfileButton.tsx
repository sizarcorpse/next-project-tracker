"use client";
import Link from "next/link";
import { RiEditLine } from "react-icons/ri";

const UpdateProfileButton: React.FC = () => {
  return (
    <Link
      href="/u/profile-settings"
      className="group w-full flex flex-row items-center justify-between gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-xl text-xs font-semibold"
    >
      <span>Update Profile</span>
      <RiEditLine
        size="1rem"
        className="group-hover:text-accent transition-colors"
      />
    </Link>
  );
};

export default UpdateProfileButton;
