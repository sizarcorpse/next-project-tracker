"use client";

import { ProjectInstructionEditor } from "@/components/project/";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProjectInstructionSheet } from "@/hooks/";

const ProjectInstruction = ({ content, projectId }: any) => {
  const { isOpen, onOpen, onClose } = useProjectInstructionSheet();

  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      {!content ? (
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={onOpen}
        >
          Add Project Instructions
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={onOpen}
        >
          View Project Instructions
        </Button>
      )}

      <SheetContent className="bg-popover w-full p-0 overflow-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg">
        <div className="w-full flex flex-col items-start justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10 lg:order-1 xl:p-12">
          <SheetHeader>
            <SheetTitle className="text-xl">Instructions</SheetTitle>
            <SheetDescription className="text-sm">
              This is a description of the instructions to be executed by the
              user.
            </SheetDescription>
          </SheetHeader>
          <ProjectInstructionEditor
            content={content}
            projectId={projectId}
            editable={true}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectInstruction;
