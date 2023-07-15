import { ProjectDetailsCard } from "@/components/project/";

const ProjectPage = async ({ params: { project } }: any) => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <div className="container max-w-screen-2xl mx-auto p-6 min-h-[calc(100vh-52px-16px)] grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 flex flex-col items-start justify-start">
          <ProjectDetailsCard />
        </div>
        <div className="col-span-12 md:col-span-8 grid grid-cols-1 grid-rows-3 gap-6">
          <div className="row-span-3"></div>
          <div className="row-span-6"></div>
          <div className="row-span-3"></div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
