import { TeamOverview } from "@/components/team";
import { TechnologiesOverview } from "@/components/technologies";
import { Button } from "@/components/ui/button";

const Home = async () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <div className="container max-w-screen-2xl mx-auto p-6 min-h-[calc(100vh-52px-16px)] grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded-md h-full bg-muted">?</div>
        <div className="col-span-4 grid grid-cols-1 grid-rows-12 gap-4 ">
          <div className="row-span-2">
            <TeamOverview />
          </div>
          <div className="row-span-5">
            <TechnologiesOverview />
          </div>
          <div className="bg-muted rounded-md row-span-5">Tag</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
