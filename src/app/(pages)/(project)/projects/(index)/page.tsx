import { getAllProjects } from "@/actions/projects/getAllProjects";
import { Unauthenticated, Unauthorized } from "@/components/common";
import { ProjectsCollection } from "@/components/project";
import { NextPage } from "next";

type ProjectsPageProps = {
  searchParams: any;
};

const ProjectsPage: NextPage<ProjectsPageProps> = async ({ searchParams }) => {
  let query = {} as any;
  const sort = searchParams.sort;
  const order = searchParams.order;
  const type = searchParams.type;
  const priority = searchParams.priority;
  const stage = searchParams.stage;
  const status = searchParams.status;
  const si = searchParams.si;
  const page = searchParams.page;
  const limit = searchParams.limit;

  query.sort = sort;
  query.order = order;
  query.type = type;
  query.priority = priority;
  query.stage = stage;
  query.status = status;
  query.si = si;
  query.page = page;
  query.limit = limit;

  const projects = await getAllProjects(query);

  if (projects.status === "unauthorized") {
    return <Unauthorized />;
  }

  if (projects.status === "unauthenticated") {
    return <Unauthenticated />;
  }

  return (
    <div>
      <ProjectsCollection projects={projects} />
    </div>
  );
};

export default ProjectsPage;
