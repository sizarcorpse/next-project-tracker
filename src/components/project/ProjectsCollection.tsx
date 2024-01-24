"use client";

import { ProjectCard } from "@/components/project";
const ProjectsCollection = ({ projects }: any) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects.data.map((project: any, index: any) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCollection;
