"use client";

import {
  ProjectDeadlineDisplay,
  ProjectDropdownActions,
  ProjectMembers,
  ProjectPriorityDisplay,
  ProjectStageDisplay,
  ProjectTypeDisplay,
} from "@/components/project/card";
import { Button } from "@/components/ui/button";
import { UserHoverCard } from "@/components/user";
import { Profile, Project, Role, User } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { ListTodo, MessagesSquare } from "lucide-react";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Card } from "../ui/card";

type ProjectCardProps = {
  project: Project & {
    createdBy: User & {
      role: Role;
      profile: Profile;
    };
    members: User[];
  };
  index: number;
};

const ProjectTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-base font-semibold text-card-foreground line-clamp-1">
      {title}
    </h2>
  );
};

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const delay = index * 0.02;
  const animation = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await animation.start({ y: 10, opacity: 0 });
      await animation.start({ y: 0, opacity: 1 });
    };
    setTimeout(sequence, 0);
  }, [animation]);

  return (
    <motion.div
      animate={animation}
      initial={{ y: 10, opacity: 0 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      className="w-full h-full border-0 flex-center cursor-pointer"
    >
      <Card className="w-full h-full max-w-80 flex flex-col items-start justify-start transition-colors overflow-hidden">
        <div className="relative h-full max-h-40 overflow-hidden">
          <Image
            src={
              project?.coverImage ||
              "/assets/images/project-card-placeholder-2.jpg"
            }
            alt={project?.title}
            width={640}
            height={320}
            quality={100}
            priority={true}
            style={{ objectFit: "cover" }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#111827] opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-between p-2">
            <div className="w-full flex flex-row items-center justify-between">
              <UserHoverCard user={project.createdBy} />
              <ProjectDropdownActions
                projectId={project.id}
                projectSlug={project.slug}
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <ProjectDeadlineDisplay deadline={project.endDate} size="small" />
              <div className="flex flex-row items-center justify-between gap-2">
                <ProjectStageDisplay stage={project.stage} size="small" />
                <ProjectPriorityDisplay
                  priority={project.priority}
                  size="small"
                />
                <ProjectTypeDisplay type={project.type} size="small" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 py-3 flex flex-col items-start justify-between gap-2 flex-1">
          <ProjectTitle title={project.title} />
          <div className="flex flex-row items-center justify-between w-full">
            <ProjectMembers
              members={project.members}
              projectId={project.id}
              size="small"
            />
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
    </motion.div>
  );
};

export default ProjectCard;
