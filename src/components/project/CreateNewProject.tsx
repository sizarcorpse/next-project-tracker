import { CreateProjectForm } from "@/components/project";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PackagePlus, Plus } from "lucide-react";
import { FC } from "react";

const VariantCard = () => {
  return (
    <Card className="group max-w-80 max-h-60 p-4 flex flex-col items-start justify-center gap-2 cursor-pointer transition-colors hover:bg-primary">
      <PackagePlus
        strokeWidth={1}
        className="h-12 w-12 text-secondary group-hover:text-accent transition-colors"
      />
      <div className="text-card-foreground text-base font-semibold group-hover:text-primary-foreground">
        Unleash your creativity
      </div>
      <p className="text-card-foreground text-base font-normal group-hover:text-primary-foreground">
        Create a new Project here. You can add a new Project by clicking on this
        card.
      </p>
    </Card>
  );
};

const VariantButton = () => {
  return (
    <Button variant="ghost" className="px-3 py-0 w-max">
      <Plus className="h-4 w-4" />
    </Button>
  );
};

type CreateNewProjectProps = {
  variant?: "card" | "button";
};

const CreateNewProject: FC<CreateNewProjectProps> = ({ variant }: any) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {variant === "card" ? <VariantCard /> : <VariantButton />}
      </SheetTrigger>
      <SheetContent className="bg-popover w-11/12 p-0 overflow-auto md:max-w-screen-lg lg:max-w-screen-xl">
        <div className="flex flex-col h-full min-h-full lg:flex-row">
          <div className="order-2 basis-7/12 flex flex-col items-start justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10 lg:order-1 xl:p-12">
            <CreateProjectForm />
          </div>
          <div className="order-1 shrink-0 flex w-full h-[240px] basis-5/12 bg-[url('/assets/images/new-project-form-image.jpeg')] bg-cover bg-center lg:order-2 lg:h-auto"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewProject;
