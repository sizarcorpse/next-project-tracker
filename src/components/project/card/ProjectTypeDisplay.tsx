import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AppWindow,
  Frame,
  Gamepad2,
  GitPullRequest,
  LayoutGrid,
  MonitorStop,
  PanelTop,
  Stamp,
} from "lucide-react";
import { FC } from "react";

const projectTypes = [
  {
    label: "Web",
    value: "WEB",
    info: "A web project is a website or web app that runs on a browser.",
    icon: <AppWindow size={16} />,
  },
  {
    label: "App",
    value: "APP",
    info: "An app project is a mobile or tablet app that runs on a device.",
    icon: <LayoutGrid size={16} />,
  },
  {
    label: "Game",
    value: "GAME",
    info: "A game project is a video game that runs on a console, computer, or device.",
    icon: <Gamepad2 size={16} />,
  },
  {
    label: "Desktop",
    value: "DESKTOP",
    info: "A desktop project is a software application that runs on a computer.",
    icon: <MonitorStop size={16} />,
  },
  {
    label: "API",
    value: "API",
    info: "An API project is a set of functions or methods that allows communication between different software components.",
    icon: <GitPullRequest size={16} />,
  },
  {
    label: "Library",
    value: "LIBRARY",
    info: "A library project is a collection of reusable code or resources that can be imported by other projects.",
    icon: <Stamp size={16} />,
  },
  {
    label: "Other",
    value: "OTHER",
    info: "An other project is a project that does not fit into any of the above categories.",
    icon: <PanelTop size={16} />,
  },
  {
    label: "Hardware",
    value: "HARDWARE",
    info: "A hardware project is a physical device or system that performs a specific function or task.",
    icon: <Frame size={16} />,
  },
];

type ProjectTypeDisplayProps = {
  type: string;
  layout?: "icon" | "text";
  size?: "small";
};

const TooltipContentInfo = ({ item }: any) => (
  <TooltipContent>
    <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
      {projectTypes.map((type) => (
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

const LayoutIconOnly = ({ item, size }: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            className={`${
              size === "small" ? "rounded-sm p-1 " : "p-2 rounded-md"
            }`}
          >
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

const ProjectTypeDisplay: FC<ProjectTypeDisplayProps> = ({
  type,
  layout = "icon",
  size,
}: any) => {
  const typeItem = projectTypes.find((item) => item.value === type) || null;
  if (!type) {
    return <Skeleton className="h-9 w-9 bg-muted" />;
  }

  return (
    <>
      {layout === "icon" && <LayoutIconOnly item={typeItem} size={size} />}
      {layout === "text" && <LayoutIconWithText item={typeItem} />}
    </>
  );
};

export default ProjectTypeDisplay;
