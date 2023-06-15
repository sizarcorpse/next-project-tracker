"use client";

import { ProfilePhoto } from "@/components/profile/";
import Link from "next/link";
import { RiEditLine } from "react-icons/ri";
interface UserInformationProps {
  data: {
    name: string | null;
    username?: string | null;
    role?: string;
    image?: string | null;
    email?: string | null;
  };
}

const RoleChip: React.FC<{ role: string }> = ({ role }) => {
  return (
    <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-xl text-xs font-semibold">
      {role}
    </span>
  );
};

const EditButton: React.FC = ({}) => {
  return (
    <Link
      href="/profile/update"
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

const UserInformation: React.FC<UserInformationProps> = ({
  data: { name, username, role, image, email },
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-4 sm:gap-8 md:flex-col md:items-start">
      <ProfilePhoto image={image} />
      <h1 className="flex flex-col">
        <div className="flex items-center justify-start gap-2">
          <span className="text-base sm:text-xl font-semibold text-slate-800">
            {name}
          </span>
          {role && <RoleChip role={role} />}
        </div>
        <span className="text-sm font-medium text-slate-700">
          @{username ?? "anonymous"}
        </span>
        <span className="text-sm font-medium text-slate-700">{email}</span>
      </h1>
      <EditButton />
    </div>
  );
};

export default UserInformation;
