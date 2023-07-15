"use client";

import { ProjectUpdateFrom } from "@/components/project/";
import { useParams } from "next/navigation";
import useSwr from "swr";

const ProjectUpdate = () => {
  const { project: param } = useParams();

  const {
    data: project,
    error,
    isLoading,
  } = useSwr(`${process.env.NEXT_API_URL}/projects/${param}/`);

  return (
    <div className="container max-w-screen-2xl mx-auto p-6 grid grid-cols-12 gap-4">
      <div className="col-span-12 h-full gap-4 md:col-span-6 lg:col-span-7 xl:col-span-6 flex flex-col items-start justify-start">
        <div className="bg-popover w-full p-4 rounded-md">
          <ProjectUpdateFrom project={project?.data} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-6 lg:col-span-5 grid grid-cols-1 gap-6 content-start">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default ProjectUpdate;
