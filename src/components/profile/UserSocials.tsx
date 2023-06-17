"use client";

import Link from "next/link";
import { IconType } from "react-icons";

import {
  RiFacebookLine,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterLine,
} from "react-icons/ri";

interface UserSocialLinkProp {
  url: string;
  icon: IconType;
}

interface UserSocialsProps {
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
}

const UserSocialsLink: React.FC<UserSocialLinkProp> = ({ url, icon }) => {
  const Icon = icon;

  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-row items-center justify-center text-base text-slate-800 bg-slate-200 p-2 rounded-full hover:bg-slate-300 hover:text-rose-400 transition-colors"
    >
      <Icon />
    </Link>
  );
};

const UserSocials: React.FC<UserSocialsProps> = ({
  facebook,
  twitter,
  instagram,
  linkedin,
  github,
}) => {
  if (!facebook && !twitter && !instagram && !linkedin && !github) return null;
  return (
    <div className="flex flex-row item-start justify-start gap-2">
      {facebook && <UserSocialsLink url={facebook} icon={RiFacebookLine} />}
      {twitter && <UserSocialsLink url={twitter} icon={RiTwitterLine} />}
      {instagram && <UserSocialsLink url={instagram} icon={RiInstagramLine} />}
      {linkedin && <UserSocialsLink url={linkedin} icon={RiLinkedinLine} />}
      {github && <UserSocialsLink url={github} icon={RiGithubLine} />}
    </div>
  );
};

export default UserSocials;
