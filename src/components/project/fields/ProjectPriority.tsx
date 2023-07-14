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
  Brush,
  Info,
  PocketKnife,
  Sword,
  Swords,
  Trophy,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
            {projectPriorities.map((priority) => (
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

const ProjectPriority = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              <Trophy size={16} />
              <p>Project Priority</p>
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
              {projectPriorities.map((item) => (
                <SelectItem key={item.value} value={item.value}>
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

export default ProjectPriority;
