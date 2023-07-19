"use client";

import { PTDialog } from "@/components/common";
import { UserHoverCard } from "@/components/profile";
import {
  ProjectDeadlineDisplay,
  ProjectDropdownActions,
  ProjectLinksDisplay,
  ProjectPriorityDisplay,
  ProjectStageDisplay,
  ProjectStatusDisplay,
  ProjectTechnologyDisplay,
  ProjectTitleDisplay,
  ProjectTypeDisplay,
  ProjectVisibilityDisplay,
} from "@/components/project/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDialog } from "@/hooks/";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSwr from "swr";

const ProjectCoverImage = ({ image }: any) => {
  return (
    <div className="w-full">
      <Image
        src={image || "/assets/images/project-card-placeholder-1.jpg"}
        width={720}
        height={450}
        alt="Project Cover Image"
        style={{ objectFit: "cover", aspectRatio: "16/5" }}
      />
    </div>
  );
};

const ProjectDescription = ({ description }: any) => {
  const { onOpen } = useDialog();
  return (
    <div>
      <p
        className="text-base font-normal text-card-foreground line-clamp-3 cursor-pointer text-justify"
        onClick={onOpen}
      >
        {description}
      </p>
      <PTDialog>
        <p className="text-base font-normal text-popover-foreground">
          {description}
        </p>
      </PTDialog>
    </div>
  );
};

const ProjectDetailsCard = () => {
  const { project: project_slug } = useParams();
  const { data, error, isLoading } = useSwr(
    `${process.env.NEXT_API_URL}/projects/${project_slug}`
  );

  if (isLoading) return <div>Loading...</div>;
  const project = data?.data || {};

  return (
    <div className="bg-card text-card-foreground rounded-md overflow-hidden">
      <div className="relative w-full">
        <ProjectCoverImage image={project.coverImage} />
        <div className="absolute top-0 h-full w-full p-4 flex flex-col items-start justify-between">
          <div className="w-full flex items-start justify-between gap-4">
            <UserHoverCard item={project.createdBy} />
            <ProjectDropdownActions
              projectId={project.id}
              projectSlug={project.slug}
            />
          </div>
          <div className="inline-flex items-center gap-2">
            <ProjectVisibilityDisplay visibility={project.visibility} />
            <ProjectStatusDisplay status={project.status} />
            <ProjectDeadlineDisplay deadline={project.endDate} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-start justify-start gap-4">
          <ProjectTitleDisplay title={project.title} />
          <div className="flex flex-row items-start justify-start gap-2">
            <ProjectTypeDisplay type={project.type} layout="text" />
            <ProjectStageDisplay stage={project.stage} layout="text" />
            <ProjectPriorityDisplay priority={project.priority} layout="text" />
          </div>
        </div>
        <ProjectDescription description={project.description} />
        <ProjectTechnologyDisplay technologies={project.technologies} />
        <div className="flex flex-row items-center justify-start gap-2">
          <ProjectLinksDisplay
            githubLink={project.githubLink}
            figmaLink={project.figmaLink}
            liveLink={project.liveLink}
            devLink={project.devLink}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
