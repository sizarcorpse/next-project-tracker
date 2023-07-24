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
  Archive,
  AreaChart,
  ClipboardX,
  Info,
  PenLine,
  Radiation,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projectStatus = [
  {
    label: "Active",
    value: "ACTIVE",
    icon: <Radiation size={16} />,
    info: "An active project is currently being worked on and is in progress.",
  },
  {
    label: "Archive",
    value: "ARCHIVE",
    icon: <Archive size={16} />,
    info: "An archived project is no longer being worked on and is no longer in progress.",
  },
  {
    label: "Draft",
    value: "DRAFT",
    icon: <PenLine size={16} />,
    info: "A draft project is not yet ready to be worked on and is not in progress.",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
    icon: <ClipboardX size={16} />,
    info: "A high priority project is very urgent and important and should be done as soon as possible.",
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
            {projectStatus.map((priority) => (
              <div
                className="flex flex-row items-start justify-start gap-4"
                key={priority.value}
              >
                <span
                  className={`${
                    field.value === priority.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  }`}
                >
                  {priority?.icon}
                </span>
                <span
                  className={`${
                    field.value === priority.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  } text-xs `}
                >
                  {priority?.info}
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectStatus = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              <AreaChart size={16} />
              <p>Project Status</p>
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
                aria-label="Project Priority"
              >
                <SelectValue placeholder="Project Priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-0">
              {projectStatus.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="transition-colors cursor-pointer"
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

export default ProjectStatus;
