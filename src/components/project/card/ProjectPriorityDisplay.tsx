import { Badge } from "@/components/ui/badge";
import { Brush, PocketKnife, Sword, Swords, Wrench } from "lucide-react";
import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const priorities = [
  {
    label: "Lowest",
    value: "LOWEST",
    icon: <Brush size={14} />,
  },
  {
    label: "Low",
    value: "LOW",
    icon: <PocketKnife size={14} />,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: <Wrench size={14} />,
  },
  {
    label: "High",
    value: "HIGH",
    icon: <Sword size={14} />,
  },
  {
    label: "Highest",
    value: "HIGHEST",
    icon: <Swords size={14} />,
  },
];

type ProjectPriorityDisplayProps = {
  priority: string;
  layout?: "icon" | "text";
};

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
        <TooltipContent>
          <p className="text-sm text-popover-foreground">
            This project has a priority of {item?.label}.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectPriorityDisplay: FC<ProjectPriorityDisplayProps> = ({
  priority,
  layout = "icon",
}: any) => {
  const priorityItem = priorities.find((item) => item.value === priority);

  if (!priorityItem) {
    return null;
  }

  return <>{layout === "icon" && <LayoutIconOnly item={priorityItem} />}</>;
};

export default ProjectPriorityDisplay;
