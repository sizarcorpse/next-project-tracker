import { CreateNewProject, ProjectsCollection } from "@/components/project";
import { TagOverview } from "@/components/tag";
import { TeamOverview } from "@/components/team";
import { TechnologiesOverview } from "@/components/technologies";
const Home = async () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <div className="container max-w-screen-2xl mx-auto p-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md h-full bg-muted p-4 gap-4 md:col-span-8 flex flex-col items-start justify-start">
          <div className="grid grid-cols-3">
            <CreateNewProject variant="card" />
          </div>
          <ProjectsCollection />
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 content-start gap-6">
          <div className="">
            <TeamOverview />
          </div>
          <div className="">
            <TechnologiesOverview />
          </div>
          <div className="">
            <TagOverview />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
