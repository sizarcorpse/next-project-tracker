"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const ProjectTypeInformation = ({ field }: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className="group rounded-full p-0 bg-transparent">
            <span className="p-1 h-auto bg-none text-muted">
              <Info
                size={16}
                className="group-hover:text-accent transition-colors"
              />
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
            {projectTypes.map((type) => (
              <div
                className="flex flex-row items-start justify-start gap-4"
                key={type.value}
              >
                <span
                  className={`${
                    field.value === type.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  }`}
                >
                  {type?.icon}
                </span>
                <span
                  className={`${
                    field.value === type.value
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

const ProjectType = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-4">
              <FolderOpenDot size={16} />
              <p>Project Type</p>
            </div>
            <ProjectTypeInformation field={field} />
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className="border-0 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Project Type"
              >
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-0">
              {projectTypes.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="transition-colors  cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2 border-0">
                    {item.icon}
                    {item.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProjectType;
