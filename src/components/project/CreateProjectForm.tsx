"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CREATE_PROJECT_PERMISSION } from "@/utils/permissions";
import { Loader2 } from "lucide-react";

import { createProject } from "@/actions/project/createProject";
import {
  ProjectCurrentStage,
  ProjectPriority,
  ProjectRedirect,
  ProjectType,
  ProjectVisibility,
} from "@/components/project/";
import { Input } from "@/components/ui/input";
import { usePermission } from "@/hooks/";
import { cn } from "@/libs/utils";
import {
  createProjectValidation,
  type CreateProjectRequest,
} from "@/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CreateProjectForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirect, setRedirect] = useState<boolean>(true);
  const router = useRouter();

  const { data: session } = useSession();
  const isPermitted = usePermission(session?.user?.permissions, [
    CREATE_PROJECT_PERMISSION,
  ]);

  const form = useForm<CreateProjectRequest>({
    resolver: zodResolver(createProjectValidation),
    defaultValues: {
      title: "",
      type: undefined,
      priority: undefined,
      visibility: undefined,
      stage: undefined,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      if (!isPermitted) {
        throw Error("You don't have permission to create a project.");
      }

      const res = await createProject(data);
      if (res.status !== "ok") {
        throw Error(res.message);
      }

      toast.success("Project created successfully ✨");

      if (isRedirect) {
        setIsLoading(false);
        router.push(`/projects/${res.data?.slug}/update`);
      } else {
        reset();
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-popover-foreground md:text-4xl ">
              Lets start with a name for <br />
              your project.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter your project name"
                      autoComplete="off"
                      {...field}
                      className="bg-muted text-muted-foreground border-none text-2xl font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
            <ProjectType form={form} />
            <ProjectPriority form={form} />
            <ProjectVisibility form={form} />
            <ProjectCurrentStage form={form} />
          </div>
          <Separator />
          <div className="flex flex-col gap-4 items-center justify-between sm:flex-row">
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className={cn(`mt-auto gap-2`)}
            >
              <Loader2
                strokeWidth={1.5}
                className={cn(
                  `hidden w-4 h-4`,
                  isLoading && `block animate-spin`
                )}
              />
              {isLoading ? "Creating Project" : "Create Project"}
            </Button>
            <ProjectRedirect setRedirect={setRedirect} value={isRedirect} />
          </div>
        </form>
      </Form>
      <div>
        {!isPermitted && (
          <div className="text-center text-base text-destructive">
            You don&apos;t have permission to create a project. Contact your
            administrator to get access.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectForm;
