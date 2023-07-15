import { Badge } from "@/components/ui/badge";
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
import { FC } from "react";

const projectStages = [
  {
    label: "Concept",
    value: "CONCEPT",
    icon: <Lightbulb size={16} />,
    info: "A concept stage is where the project idea is generated and validated.",
  },
  {
    label: "Planning",
    value: "PLANNING",
    icon: <Presentation size={16} />,
    info: "A planning stage is where the project scope, objectives, timeline, budget, and resources are defined and documented.",
  },
  {
    label: "Design",
    value: "DESIGN",
    icon: <Brush size={16} />,
    info: "A design stage is where the project requirements are translated into visual and functional elements.",
  },
  {
    label: "Development",
    value: "DEVELOPMENT",
    icon: <Code size={16} />,
    info: "A development stage is where the project code and functionality are implemented and integrated.",
  },
  {
    label: "Testing",
    value: "TESTING",
    icon: <FlaskConical size={16} />,
    info: "A testing stage is where the project quality and performance are verified and validated.",
  },
  {
    label: "Deployment",
    value: "DEPLOYMENT",
    icon: <Rocket size={16} />,
    info: "A deployment stage is where the project is delivered and launched to the target audience or market.",
  },
  {
    label: "Maintenance",
    value: "MAINTENANCE",
    icon: <Construction size={16} />,
    info: "A maintenance stage is where the project is monitored and supported for any issues or improvements.",
  },
];

type ProjectStageDisplayProps = {
  stage: string;
  layout?: "icon" | "text";
};

const TooltipContentInfo = ({ item }: any) => (
  <TooltipContent>
    <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
      {projectStages.map((type) => (
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
              {item?.label} Stage
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContentInfo item={item} />
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectStageDisplay: FC<ProjectStageDisplayProps> = ({
  stage,
  layout = "icon",
}: any) => {
  const stageItem = projectStages.find((item) => item.value === stage);

  return (
    <>
      {layout === "icon" && <LayoutIconOnly item={stageItem} />}
      {layout === "text" && <LayoutIconWithText item={stageItem} />}
    </>
  );
};

export default ProjectStageDisplay;
