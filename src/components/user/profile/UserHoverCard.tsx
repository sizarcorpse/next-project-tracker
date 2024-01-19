import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRoleChip } from "@/components/user";
import { cn } from "@/libs/utils";
import { Profile, Role, type User } from "@prisma/client";
import { FC } from "react";

type UserHoverCardProps = {
  user: User & {
    role: Role;
    profile: Profile;
  };
  open?: boolean;
  size?: "small";
};

const UserHoverCardLoading = () => {
  return <Skeleton className="h-10 w-10 rounded-full bg-card" />;
};

const UserHoverCard: FC<UserHoverCardProps> = ({ user, open, size }) => {
  if (!user) return <UserHoverCardLoading />;

  const {
    username,
    image,
    role,
    profile: { designation, company },
  } = user;

  const avatarSrc = image || "/assets/images/default-avatar.jpeg";

  return (
    <HoverCard open={open}>
      <HoverCardTrigger asChild>
        <Avatar
          className={cn(
            `cursor-pointer ${size === "small" ? "w-7 h-7" : "w-10 h-10"}`
          )}
        >
          <AvatarImage src={avatarSrc} />
          <AvatarFallback />
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-start space-x-4">
          <Avatar>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-base font-medium text-popover-foreground inline-flex gap-4 items-center">
              <span className="inline-flex gap-1 items-center">{username}</span>
              {role && <UserRoleChip role={role.name} size="sm" />}
            </h4>
            {designation && company ? (
              <p className="text-sm">
                {designation} at @{company}.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No designation and company.
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
