"use client";

import { ProjectCard } from "@/components/project";
import useSWR from "swr";

const ProjectsCollection = () => {
  const { data, error } = useSWR(`${process.env.NEXT_API_URL}/projects/`);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data?.data?.projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCollection;
