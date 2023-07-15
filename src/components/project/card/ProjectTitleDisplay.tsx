import { cn } from "@/libs/utils";
import { FC } from "react";

type ProjectTitleDisplayProps = {
  title: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const ProjectTitleDisplay: FC<ProjectTitleDisplayProps> = ({
  title,
  size = "medium",
  className,
}) => {
  return (
    <h2
      className={cn(
        `font-semibold text-card-foreground ${
          size === "small"
            ? "text-base font-semibold line-clamp-1"
            : size === "medium"
            ? "text-xl line-clamp-2"
            : "text-2xl line-clamp-1"
        }}`,
        className
      )}
    >
      {title}
    </h2>
  );
};

export default ProjectTitleDisplay;
