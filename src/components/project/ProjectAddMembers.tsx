import { ProjectAddMembersForm } from "@/components/project/";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { forwardRef } from "react";

import { Plus } from "lucide-react";

const ProjectAddMembers = forwardRef((props, ref) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-full w-10 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ProjectAddMembersForm ref={ref} {...props} />
      </DialogContent>
    </Dialog>
  );
});

ProjectAddMembers.displayName = "ProjectAddMembers";
export default ProjectAddMembers;
