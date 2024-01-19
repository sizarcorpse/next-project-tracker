import { ProjectAddMembers } from "@/components/project";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserHoverCard } from "@/components/user";
import slice from "lodash/slice";
import { FC, forwardRef } from "react";

interface ProjectMembers {
  members: any[];
  projectId: any;
  size?: "small";
}

const ProjectAllMemberPopover = ({ members }: any) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center bg-primary rounded-full w-10 h-10 cursor-pointer">
          <p className="text-sm font-semibold text-primary-foreground">
            +{members.length - 2}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-popover sm:max-w-screen-md min-h-fit flex flex-col items-start justify-start gap-6 p-4">
        <div className="flex flex-row items-start justify-start gap-4 w-full">
          {members.map((member: any, index: any) => (
            <UserHoverCard key={index} user={member} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ProjectMembers: FC<ProjectMembers> = forwardRef((props, ref) => {
  const { members, size } = props || {};
  return (
    <div className="flex gap-1">
      {slice(members, 0, 2).map((member, index) => (
        <UserHoverCard key={index} user={member} size={size} />
      ))}
      {members?.length > 2 && <ProjectAllMemberPopover members={members} />}
      <ProjectAddMembers {...props} />
    </div>
  );
});
ProjectMembers.displayName = "ProjectMembers";
export default ProjectMembers;
