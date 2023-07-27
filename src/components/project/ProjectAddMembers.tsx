import { ProjectAddMembersForm } from "@/components/project/";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/libs/utils";
import { Plus } from "lucide-react";
import { FC, forwardRef } from "react";
interface ProjectAddMembers {
  members: any[];
  projectId: any;
  size?: "small";
}

const ProjectAddMembers: FC<ProjectAddMembers> = forwardRef((props, ref) => {
  const { size } = props || {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            `rounded-full h-auto p-0 ${
              size === "small" ? "w-7 h-7" : "w-10 h-10"
            }`
          )}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-popover sm:max-w-screen-md min-h-fit flex flex-col items-start justify-start gap-6 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <ProjectAddMembersForm ref={ref} {...props} />
      </DialogContent>
    </Dialog>
  );
});

ProjectAddMembers.displayName = "ProjectAddMembers";
export default ProjectAddMembers;
