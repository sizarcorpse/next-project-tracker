import {
  ProjectsFilter,
  ProjectsSignature,
  ProjectsSort,
  ProjectsStatus,
} from "@/components/projects";

const ProjectsToolbar = () => {
  return (
    <div className="flex flex-col justify-between w-full sm:flex-row">
      <div className="flex gap-2">
        <ProjectsSignature />
        <ProjectsStatus />
      </div>
      <div className="flex gap-2">
        <ProjectsFilter />
        <ProjectsSort />
      </div>
    </div>
  );
};

export default ProjectsToolbar;
