import { Badge } from "@/components/ui/badge";

import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brush,
  Code,
  Combine,
  Construction,
  FlaskConical,
  Lightbulb,
  Presentation,
  Rocket,
} from "lucide-react";

const stages = [
  {
    label: "Concept",
    value: "CONCEPT",
    icon: <Lightbulb size={16} />,
  },
  {
    label: "Planning",
    value: "PLANNING",
    icon: <Presentation size={16} />,
  },
  {
    label: "Design",
    value: "DESIGN",
    icon: <Brush size={16} />,
  },
  {
    label: "Development",
    value: "DEVELOPMENT",
    icon: <Code size={16} />,
  },
  {
    label: "Testing",
    value: "TESTING",
    icon: <FlaskConical size={16} />,
  },
  {
    label: "Deployment",
    value: "DEPLOYMENT",
    icon: <Rocket size={16} />,
  },
  {
    label: "Maintenance",
    value: "MAINTENANCE",
    icon: <Construction size={16} />,
  },
];

type ProjectStageDisplayProps = {
  stage: string;
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
            This project is of type {item?.label}.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectStageDisplay: FC<ProjectStageDisplayProps> = ({
  stage,
  layout = "icon",
}: any) => {
  const stageItem = stages.find((item) => item.value === stage);

  return <>{layout === "icon" && <LayoutIconOnly item={stageItem} />}</>;
};

export default ProjectStageDisplay;
