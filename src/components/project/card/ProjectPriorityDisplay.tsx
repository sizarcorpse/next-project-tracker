import { Badge } from "@/components/ui/badge";
import { Brush, PocketKnife, Sword, Swords, Wrench } from "lucide-react";
import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projectPriorities = [
  {
    label: "Lowest",
    value: "LOWEST",
    icon: <Brush size={16} />,
    info: "A lowest priority project is not urgent or important and can be done later or skipped.",
  },
  {
    label: "Low",
    value: "LOW",
    icon: <PocketKnife size={16} />,
    info: "A low priority project is not urgent but somewhat important and can be done after higher priority projects.",
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: <Wrench size={16} />,
    info: "A medium priority project is moderately urgent and important and should be done soon.",
  },
  {
    label: "High",
    value: "HIGH",
    icon: <Sword size={16} />,
    info: "A high priority project is very urgent and important and should be done as soon as possible.",
  },
  {
    label: "Highest",
    value: "HIGHEST",
    icon: <Swords size={16} />,
    info: "A highest priority project is extremely urgent and important and should be done immediately.",
  },
];

type ProjectPriorityDisplayProps = {
  priority: string;
  layout?: "icon" | "text";
};

const TooltipContentInfo = ({ item }: any) => (
  <TooltipContent>
    <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
      {projectPriorities.map((type) => (
        <div
          className="flex flex-row items-start justify-start gap-4"
          key={type.value}
        >
          <span
            className={`${
              item.value === type.value
                ? "text-accent"
                : "text-popover-foreground"
            }`}
          >
            {type?.icon}
          </span>
          <span
            className={`${
              item.value === type.value
                ? "text-accent"
                : "text-popover-foreground"
            } text-xs `}
          >
            {type?.info}
          </span>
        </div>
      ))}
    </div>
  </TooltipContent>
);

const LayoutIconOnly = ({ item }: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className="rounded-full p-2">
            <span className="text-xs text-primary-foreground inline-flex items-center justify-center gap-2">
              {item?.icon}
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContentInfo item={item} />
      </Tooltip>
    </TooltipProvider>
  );
};

const LayoutIconWithText = ({ item }: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className="rounded-md p-2 inline-flex items-start justify-center gap-2">
            <span className="text-xs text-primary-foreground">
              {item?.icon}
            </span>
            <span className="text-xs text-primary-foreground">
              {item?.label} Priority
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContentInfo item={item} />
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectPriorityDisplay: FC<ProjectPriorityDisplayProps> = ({
  priority,
  layout = "icon",
}: any) => {
  const priorityItem = projectPriorities.find(
    (item) => item.value === priority
  );

  if (!priorityItem) {
    return null;
  }

  return (
    <>
      {layout === "icon" && <LayoutIconOnly item={priorityItem} />}
      {layout === "text" && <LayoutIconWithText item={priorityItem} />}
    </>
  );
};

export default ProjectPriorityDisplay;
