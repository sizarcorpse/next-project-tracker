import { UserHoverCard } from "@/components/profile";
import { ProjectAddMembers } from "@/components/project";
import { forwardRef } from "react";
const ProjectMembers = forwardRef((props: any, ref) => {
  const { members } = props;
  return (
    <div className="flex gap-2">
      {members?.map((member: any) => (
        <UserHoverCard key={member.id} item={member} />
      ))}
      <ProjectAddMembers {...props} />
    </div>
  );
});
ProjectMembers.displayName = "ProjectMembers";
export default ProjectMembers;
