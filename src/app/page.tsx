import { TagOverview } from "@/components/tag";
import { TeamOverview } from "@/components/team";
import { TechnologiesOverview } from "@/components/technologies";

const Home = async () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <div className="container max-w-screen-2xl mx-auto p-6 min-h-[calc(100vh-52px-16px)] grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 rounded-md h-full bg-muted">
          ?
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 grid-rows-3 gap-6">
          <div className="row-span-3">
            <TeamOverview />
          </div>
          <div className="row-span-6">
            <TechnologiesOverview />
          </div>
          <div className="row-span-3">
            <TagOverview />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
