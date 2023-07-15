import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Activity,
  Archive,
  ClipboardCheck,
  Radiation,
  Save,
  XSquare,
} from "lucide-react";
import { FC } from "react";

const projectStatus = [
  {
    label: "Active",
    value: "ACTIVE",
    icon: <Activity size={16} />,
    info: "An active project is in progress and has not reached its goal or deadline yet. You can view, edit, and update an active project as needed.",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
    icon: <Radiation size={16} />,
    info: "An inactive project is paused or on hold and has not reached its goal or deadline yet. You can resume, edit, or cancel an inactive project as needed.",
  },
  {
    label: "Archived",
    value: "ARCHIVED",
    icon: <Archive size={16} />,
    info: "An archived project is no longer in progress and has reached its goal or deadline. You can view an archived project, but you cannot edit or update it.",
  },
  {
    label: "Completed",
    value: "COMPLETED",
    icon: <ClipboardCheck size={16} />,
    info: "A completed project is no longer in progress and has reached its goal or deadline successfully. You can view and celebrate a completed project, but you cannot edit or update it.",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
    icon: <XSquare size={16} />,
    info: "A cancelled project is no longer in progress and has not reached its goal or deadline due to some reason. You can view and learn from a cancelled project, but you cannot edit or update it.",
  },
  {
    label: "Draft",
    value: "DRAFT",
    icon: <Save size={16} />,
    info: "A draft project is not yet in progress and has not set its goal or deadline yet. You can create, edit, and start a draft project as needed.",
  },
];

type ProjectStatusDisplayProps = {
  status: string;
  layout?: "icon" | "text";
};

const TooltipContentInfo = ({ item }: any) => (
  <TooltipContent>
    <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
      {projectStatus.map((type) => (
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
          <Badge className="rounded-md p-2">
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
              {item?.label}
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContentInfo item={item} />
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectStatusDisplay: FC<ProjectStatusDisplayProps> = ({
  status,
  layout = "icon",
}: any) => {
  const typeItem = projectStatus.find((item) => item.value === status);

  return (
    <>
      {layout === "icon" && <LayoutIconOnly item={typeItem} />}
      {layout === "text" && <LayoutIconWithText item={typeItem} />}
    </>
  );
};

export default ProjectStatusDisplay;
