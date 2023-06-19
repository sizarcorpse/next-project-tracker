"use client";
import Link from "next/link";
import { RiEditLine } from "react-icons/ri";

const UpdateProfileButton: React.FC = () => {
  return (
    <Link
      href="/u/profile-settings"
      className="group flex flex-row items-center justify-center gap-2 bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-semibold"
    >
      <span>Update Profile</span>
      <RiEditLine
        size="1rem"
        className="group-hover:text-amber-500 transition-colors"
      />
    </Link>
  );
};

export default UpdateProfileButton;
