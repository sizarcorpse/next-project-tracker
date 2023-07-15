import { UserHoverCard } from "@/components/profile";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Card } from "../ui/card";

import { Separator } from "@/components/ui/separator";
import { ListTodo, MessagesSquare } from "lucide-react";

import {
  ProjectDeadlineDisplay,
  ProjectDropdownActions,
  ProjectPriorityDisplay,
  ProjectStageDisplay,
  ProjectTagsDisplay,
  ProjectTypeDisplay,
} from "@/components/project/card";

const ProjectTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
  );
};

const ProjectCard = ({ project }: any) => {
  return (
    <Card className="w-full h-full max-w-80 max-h- flex flex-col items-start justify-center transition-colors overflow-hidden">
      <div className="relative">
        <Image
          src={
            project?.coverImage ||
            "/assets/images/project-card-placeholder-1.jpg"
          }
          alt={project?.title}
          width={320}
          height={100}
          style={{ objectFit: "cover", aspectRatio: "16/6" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#111827] opacity-50"></div>
        <div className="absolute top-0 w-full p-2 flex flex-row items-center justify-between">
          <UserHoverCard item={project.createdBy} />
          <ProjectDropdownActions
            projectId={project.id}
            projectSlug={project.slug}
          />
        </div>
        <div className="absolute bottom-0 w-full p-2 flex flex-row items-center justify-between">
          <ProjectDeadlineDisplay deadline={project.endDate} size="small" />
          <div className="flex flex-row items-center justify-between gap-2">
            <ProjectStageDisplay stage={project.stage} size="small" />
            <ProjectPriorityDisplay priority={project.priority} size="small" />
            <ProjectTypeDisplay type={project.type} size="small" />
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-2 flex flex-col items-start justify-start gap-2">
        <ProjectTitle title={project.title} />
        <ProjectTagsDisplay />
        <Separator className="bg-secondary" />
        <div className="flex flex-row items-center justify-between w-full">
          <div></div>
          <div>
            <Button variant="ghost" className="text-sm h-auto p-2">
              <ListTodo className="h-4 w-4 mr-1" />
              12
            </Button>
            <Button variant="ghost" className="text-sm h-auto p-2">
              <MessagesSquare className="h-4 w-4 mr-1" />
              66
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
