"use client";

import { Badge } from "@/components/ui/badge";
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
import { FolderOpenDot, Info } from "lucide-react";

import { projectTypes } from "@/utils/projectsProperties";

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
            <div className="flex items-center justify-start gap-2">
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

export default ProjectType;
