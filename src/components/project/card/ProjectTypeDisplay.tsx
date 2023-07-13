import { Badge } from "@/components/ui/badge";
import {
  AppWindow,
  FolderOpenDot,
  Frame,
  Gamepad2,
  GitPullRequest,
  Info,
  LayoutGrid,
  MonitorStop,
  PanelTop,
  Stamp,
} from "lucide-react";
import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const types = [
  {
    label: "Web",
    value: "WEB",
    icon: <AppWindow size={16} />,
  },
  {
    label: "App",
    value: "APP",
    icon: <LayoutGrid size={16} />,
  },
  {
    label: "Game",
    value: "GAME",
    icon: <Gamepad2 size={16} />,
  },
  {
    label: "Desktop",
    value: "DESKTOP",
    icon: <MonitorStop size={16} />,
  },
  {
    label: "API",
    value: "API",
    icon: <GitPullRequest size={16} />,
  },
  {
    label: "Library",
    value: "LIBRARY",
    icon: <Stamp size={16} />,
  },
  {
    label: "Other",
    value: "OTHER",
    icon: <PanelTop size={16} />,
  },

  {
    label: "Hardware",
    value: "HARDWARE",
    icon: <Frame size={16} />,
  },
];

type ProjectTypeDisplayProps = {
  type: string;
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

const ProjectTypeDisplay: FC<ProjectTypeDisplayProps> = ({
  type,
  layout = "icon",
}: any) => {
  const typeItem = types.find((item) => item.value === type);

  return <>{layout === "icon" && <LayoutIconOnly item={typeItem} />}</>;
};

export default ProjectTypeDisplay;
