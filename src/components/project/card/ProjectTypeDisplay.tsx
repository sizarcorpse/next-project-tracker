import { Badge } from "@/components/ui/badge";
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
          <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
            {types.map((type, index) => (
              <div
                className="flex flex-row items-start justify-start gap-4"
                key={index}
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
