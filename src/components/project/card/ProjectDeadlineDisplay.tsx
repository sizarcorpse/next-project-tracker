import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
} from "date-fns";
import { Clock } from "lucide-react";
import { FC } from "react";

type ProjectDeadlineDisplayProps = {
  deadline?: Date | null;
  size?: "small";
};

const ProjectDeadlineDisplay: FC<ProjectDeadlineDisplayProps> = ({
  deadline,
  size,
}: any) => {
  if (!deadline) {
    return <Skeleton className="h-9 w-20 bg-muted" />;
  }

  const endDate = new Date(deadline);
  const today = new Date();
  const days = differenceInDays(endDate, today);
  const months = differenceInMonths(endDate, today);
  const remainingDays = differenceInDays(endDate, today) - months * 30;
  const hours =
    differenceInHours(endDate, today) - months * 24 * 30 - remainingDays * 24;

  let timeDiff = "";

  if (months > 0) {
    timeDiff += `${months} Month${months > 1 ? "s" : ""} `;
  }

  if (remainingDays > 0) {
    timeDiff += `${remainingDays} Day${remainingDays > 1 ? "s" : ""} `;
  }

  if (days <= 2 && hours > 0) {
    timeDiff += `${hours} Hour${hours > 1 ? "s" : ""}`;
  }

  return (
    <Badge
      className={`bg-secondary hover:bg-secondary ${
        size === "small" ? "p-1" : "p-2"
      } rounded-sm`}
    >
      <div className="flex flex-col items-start justify-start gap-1">
        <time
          dateTime={deadline}
          className="text-xs text-secondary-foreground inline-flex gap-1 items-center"
        >
          <Clock className="h-4 w-4 text-secondary-foreground" />
          {timeDiff}
        </time>
      </div>
    </Badge>
  );
};

export default ProjectDeadlineDisplay;
