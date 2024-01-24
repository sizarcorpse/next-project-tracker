import {
  ProjectsFilter,
  ProjectsSignature,
  ProjectsSort,
  ProjectsStatus,
} from "@/components/projects";
import { Suspense } from "react";

function SearchBarFallback() {
  return null;
}

const ProjectsToolbar = () => {
  return (
    <div className="flex flex-col justify-between w-full sm:flex-row">
      <Suspense fallback={<SearchBarFallback />}>
        <div className="flex gap-2">
          <ProjectsSignature />
          <ProjectsStatus />
        </div>
        <div className="flex gap-2">
          <ProjectsFilter />
          <ProjectsSort />
        </div>
      </Suspense>
    </div>
  );
};

export default ProjectsToolbar;
