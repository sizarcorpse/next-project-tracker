import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { FC } from "react";

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

type ProjectVisibilityDisplayProps = {
  visibility: string;
  layout?: "icon" | "text";
};

const TooltipContentInfo = ({ item }: any) => (
  <TooltipContent>
    <div className="flex flex-col items-start justify-start gap-2 w-80 p-2">
      {projectVisibilities.map((type) => (
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
          <Badge className="rounded-full p-2">
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

const ProjectVisibilityDisplay: FC<ProjectVisibilityDisplayProps> = ({
  visibility,
  layout = "icon",
}: any) => {
  const typeItem = projectVisibilities.find(
    (item) => item.value === visibility
  );

  return (
    <>
      {layout === "icon" && <LayoutIconOnly item={typeItem} />}
      {layout === "text" && <LayoutIconWithText item={typeItem} />}
    </>
  );
};

export default ProjectVisibilityDisplay;
