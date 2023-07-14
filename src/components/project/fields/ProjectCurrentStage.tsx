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
import {
  Brush,
  Code,
  Combine,
  Construction,
  FlaskConical,
  Info,
  Lightbulb,
  Presentation,
  Rocket,
} from "lucide-react";

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

const ProjectStageInformation = ({ field }: any) => {
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
            {projectStages.map((stage) => (
              <div
                className="flex flex-row items-start justify-start gap-4"
                key={stage.value}
              >
                <span
                  className={`${
                    field.value === stage.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  }`}
                >
                  {stage?.icon}
                </span>
                <span
                  className={`${
                    field.value === stage.value
                      ? "text-accent"
                      : "text-popover-foreground"
                  } text-xs `}
                >
                  {stage?.info}
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProjectCurrentStage = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="stage"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              <Combine size={16} />
              <p>Project Current Stage</p>
            </div>
            <ProjectStageInformation field={field} />
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className="border-0 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Project Stage"
              >
                <SelectValue placeholder="Project Stage" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-0">
              {projectStages.map((item) => (
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

export default ProjectCurrentStage;
