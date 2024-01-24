import { CreateNewProject, ProjectsCollection } from "@/components/project";
import { TagOverview } from "@/components/tag";
import { TeamOverview } from "@/components/team";
import { TechnologiesOverview } from "@/components/technologies";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token");

  try {
    const data = await fetch(`${process.env.NEXT_API_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `next-auth.session-token=${token?.value}`,
      },
    });

    const json = await data.json();
    return json;
  } catch (error) {
    return [];
  }
}

async function Home() {
  const projects = await getData();

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="container max-w-screen-2xl mx-auto p-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md bg-muted p-4 gap-4 md:col-span-8 flex flex-col items-start justify-start">
          <div className="grid grid-cols-3">
            <CreateNewProject variant="card" />
          </div>
          {/* <ProjectsCollection project={projects} /> */}
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 content-start gap-6">
          <TeamOverview />
          <TechnologiesOverview />
          <TagOverview />
        </div>
      </div>
    </div>
  );
}

export default Home;
