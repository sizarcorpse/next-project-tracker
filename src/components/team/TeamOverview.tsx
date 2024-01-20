import { getTeamMembers } from "@/actions";
import { UserHoverCard } from "@/components/user";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const TeamOverview = async () => {
  const teams = await getTeamMembers();

  return (
    <Card className="flex flex-col items-start justify-start gap-6 p-4 h-max">
      <CardHeader className="p-0 w-full">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Team Members</CardTitle>
            <CardDescription className="text-sm">
              Meet our team members. We are a small team of developers and we do
              our best to make your experience with us as good as possible.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="h-28">
        <div className="pr-4 w-full flex flex-row items-start justify-start gap-2 flex-wrap">
          {teams &&
            teams.map((user: any) => (
              <UserHoverCard key={user.id} user={user} />
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TeamOverview;
