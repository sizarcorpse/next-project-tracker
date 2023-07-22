"use client";
import {
  Editor,
  ProjectDetailsCard,
  ProjectTagsCard,
} from "@/components/project/";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useParams } from "next/navigation";
import useSwr from "swr";

const ProjectInstruction = () => {
  const { project: project_slug } = useParams();
  const { data, error, isLoading } = useSwr(
    `${process.env.NEXT_API_URL}/projects/${project_slug}`
  );

  if (isLoading) return <div>Loading...</div>;
  const { content, id } = data?.data || {};

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent className="bg-popover w-full p-0 overflow-auto md:max-w-screen-lg lg:max-w-screen-xl">
          <div className="w-full flex flex-col items-start justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10 lg:order-1 xl:p-12">
            <SheetHeader>
              <SheetTitle>Instructions</SheetTitle>
              <SheetDescription>
                This is a description of the instructions to be executed by the
                user.
              </SheetDescription>
            </SheetHeader>
            <Editor content={content} projectId={id} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectInstruction;
