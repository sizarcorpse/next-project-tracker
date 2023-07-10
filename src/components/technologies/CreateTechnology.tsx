import { CreateTechnologyForm } from "@/components/technologies/";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const CreateTechnology = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-3 py-0">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-popover sm:max-w-screen-md min-h-fit flex flex-col items-start justify-start gap-6 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 ">
        <DialogHeader className="w-full">
          <DialogTitle className="text-xl text-popover-foreground">
            Create Technology
          </DialogTitle>
          <DialogDescription className="text-sm text-popover-foreground">
            Create a new Technology here
          </DialogDescription>
        </DialogHeader>
        <CreateTechnologyForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTechnology;
