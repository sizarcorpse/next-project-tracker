import { Button } from "@/components/ui/button";

const ProjectsPagination = () => {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <Button variant="ghost" className="bg-primary/5 font-normal">
          Previous
        </Button>
        <Button variant="ghost" className="bg-primary/5 font-normal">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProjectsPagination;
