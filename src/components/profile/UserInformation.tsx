"use client";

import {
  LoadingDataRipple,
  ProfilePhoto,
  UpdateProfileButton,
  UserContact,
  UserSocials,
} from "@/components/profile/";
import { RiGenderlessLine, RiMenLine, RiWomenLine } from "react-icons/ri";
import useSwr from "swr";

interface UserInformationProps {
  user: {
    name: string | null;
    username?: string | null;
    role?: string;
    image?: string | null;
    email?: string | null;
  };
}
interface UserContextProps {
  name: string | null;
  username?: string | null;
  role?: string;
  image?: string | null;
  email?: string | null;
  gender?: string | null;
}
interface UserGenderProps {
  gender: "Male" | "Female" | "Other" | null;
}
interface BioProps {
  bio: string;
}

const RoleChip: React.FC<{ role: string }> = ({ role }) => {
  return (
    <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-xl text-xs font-semibold">
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

const UserGender: React.FC<UserGenderProps> = ({ gender }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      {gender === "Male" && <RiMenLine size="1rem" />}
      {gender === "Female" && <RiWomenLine size="1rem" />}
      {gender === "Other" && <RiGenderlessLine size="1rem" />}
    </div>
  );
};

const UserBio: React.FC<BioProps> = ({ bio }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-800 text-left">{bio}</p>
    </div>
  );
};

const UserContext: React.FC<UserContextProps> = ({
  name,
  role,
  username,
  email,
  image,
  gender,
}: any) => {
  return (
    <div className="flex flex-row items-center justify-start gap-4 sm:gap-8 md:flex-col md:items-start">
      <ProfilePhoto image={image} />
      <h1 className="flex flex-col gap-1">
        <div className="flex items-center justify-start gap-2">
          <span className="text-base sm:text-xl font-semibold text-slate-800 inline-flex gap-1">
            {name} {gender ? <UserGender gender={gender} /> : null}
          </span>

          {role && <RoleChip role={role} />}
        </div>
        <span className="text-sm font-medium text-slate-700">@{username}</span>
        <span className="text-sm font-medium text-slate-700">{email}</span>
      </h1>
    </div>
  );
};

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  const { image, name, username, role, email } = user || {};
  const { data: profile, error, isLoading } = useSwr("/api/user/profile");
  const {
    bio,
    gender,
    facebook,
    twitter,
    instagram,
    linkedin,
    github,
    designation,
    company,
    location,
    website,
    contact,
  } = profile?.data || {};

  if (isLoading) {
    return <LoadingDataRipple />;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <UserContext
        name={name}
        role={role}
        username={username}
        email={email}
        image={image}
        gender={gender}
      />
      {bio && <UserBio bio={bio} />}
      <UserContact
        company={company}
        designation={designation}
        location={location}
        contact={contact}
        website={website}
      />
      <UserSocials
        facebook={facebook}
        twitter={twitter}
        instagram={instagram}
        linkedin={linkedin}
        github={github}
      />
      <UpdateProfileButton />
    </div>
  );
};

export default UserInformation;
