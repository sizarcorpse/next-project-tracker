import { UserGender, UserRoleBadge, UserSocials } from "@/components/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";

const UserHoverCardLoading = () => {
  return <Skeleton className="h-10 w-10 rounded-full bg-card" />;
};

const UserHoverCard = ({ item, open, size }: any) => {
  if (!item) return <UserHoverCardLoading />;
  const {
    username,
    image,
    role,
    profile: {
      designation,
      company,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      gender,
    },
  } = item || {};

  const avatarSrc = image || "/assets/images/default-avatar.jpeg";

  return (
    <HoverCard open={open}>
      <HoverCardTrigger asChild>
        <Avatar
          className={`cursor-pointer ${
            size === "small" ? "w-7 h-7" : "w-10 h-10"
          }`}
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
            <h4 className="text-base font-normal text-popover-foreground inline-flex gap-4 items-center">
              <span className="inline-flex gap-1 items-center">
                {username} {gender && <UserGender gender={gender} />}
              </span>
              {role && <UserRoleBadge role={role} variant="secondary" />}
            </h4>
            {designation && company ? (
              <p className="text-sm">
                {designation} at @{company}.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                To the edge of the universe.
              </p>
            )}
            <div className="flex items-start justify-start pt-2">
              <UserSocials
                facebook={facebook}
                twitter={twitter}
                instagram={instagram}
                linkedin={linkedin}
                github={github}
                variant="ghost"
                size="sm"
              />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
