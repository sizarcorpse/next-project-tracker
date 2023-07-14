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
import { Eye, EyeOff, Info, View } from "lucide-react";

const projectVisibilities = [
  {
    label: "Public",
    value: "PUBLIC",
    icon: <Eye size={16} />,
    info: "A public project is visible to anyone who can access the platform or website where it is hosted.",
  },
  {
    label: "Private",
    value: "PRIVATE",
    icon: <EyeOff size={16} />,
    info: "A private project is visible only to the owner and the collaborators who are invited or added to the project.",
  },
];

const ProjectVisibilitiesInformation = ({ field }: any) => {
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
            {projectVisibilities.map((visibility) => (
              <div
                className="flex flex-row items-start justify-start gap-4"
                key={visibility.value}
              >
                <span
                  className={`${
                    field.value === visibility.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  }`}
                >
                  {visibility?.icon}
                </span>
                <span
                  className={`${
                    field.value === visibility.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  } text-xs `}
                >
                  {visibility?.info}
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectVisibility = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="visibility"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              <View size={16} />
              <p>Project Visibility</p>
            </div>
            <ProjectVisibilitiesInformation field={field} />
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className="border-0 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Project Visibility"
              >
                <SelectValue placeholder="Project Visibility" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-0">
              {projectVisibilities.map((item) => (
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

export default ProjectVisibility;
