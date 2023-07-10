"use client";

import { cn } from "@/libs/utils";
import { sanitizeUrl } from "@/utils";
import { cva } from "class-variance-authority";
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
  size?: "sm";
  variant?: "default" | "ghost";
}

interface UserSocialsProps {
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
  variant?: "ghost" | "default";
  size?: "sm";
}

const linkVariants = cva(
  "inline-flex items-center justify-center rounded-md rounded-md text-base",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors",
        ghost:
          "rounded-sm bg-muted hover:bg-accent hover:text-accent-foreground transition-colors",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const UserSocialsLink: React.FC<UserSocialLinkProp> = ({
  url,
  icon,
  variant,
  size,
}) => {
  const Icon = icon;
  return (
    <Link
      href={sanitizeUrl(url)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkVariants({ variant, size }))}
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
  variant,
  size,
}) => {
  if (!facebook && !twitter && !instagram && !linkedin && !github) return null;
  return (
    <div
      className={cn(
        `flex flex-row item-start justify-start ${
          size === "sm" ? "gap-1" : "gap-2"
        }`
      )}
    >
      {facebook && (
        <UserSocialsLink
          url={facebook}
          icon={RiFacebookLine}
          variant={variant}
          size={size}
        />
      )}
      {twitter && (
        <UserSocialsLink
          url={twitter}
          icon={RiTwitterLine}
          variant={variant}
          size={size}
        />
      )}
      {instagram && (
        <UserSocialsLink
          url={instagram}
          icon={RiInstagramLine}
          variant={variant}
          size={size}
        />
      )}
      {linkedin && (
        <UserSocialsLink
          url={linkedin}
          icon={RiLinkedinLine}
          variant={variant}
          size={size}
        />
      )}
      {github && (
        <UserSocialsLink
          url={github}
          icon={RiGithubLine}
          variant={variant}
          size={size}
        />
      )}
    </div>
  );
};

export default UserSocials;
