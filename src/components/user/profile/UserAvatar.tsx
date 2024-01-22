import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FC } from "react";

type UserAvatarProps = {
  size: "small" | "medium" | "large";
  alt: string | undefined | null;
  src: string | undefined | null;
};

const sizeMap = {
  small: { width: 28, height: 28 },
  medium: { width: 36, height: 36 },
  large: { width: 40, height: 40 },
};

const UserAvatar: FC<UserAvatarProps> = ({ size, alt, src }) => {
  const { width, height } = sizeMap[size];

  if (!src) {
    return (
      <div className="relative">
        <Skeleton
          className="rounded-full aspect-square"
          style={{ width, height }}
        />
      </div>
    );
  }

  return (
    <div>
      <Image
        src={src || "/assets/images/avatar-placeholder.png"}
        alt={alt || "Avatar"}
        width={width}
        height={height}
        quality={100}
        priority={true}
        className="rounded-full aspect-square object-cover object-center"
      />
    </div>
  );
};

export default UserAvatar;
