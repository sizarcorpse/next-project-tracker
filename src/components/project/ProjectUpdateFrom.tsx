"use client";

import {
  ProjectCurrentStage,
  ProjectEndDate,
  ProjectPriority,
  ProjectSocialLink,
  ProjectType,
  ProjectVisibility,
} from "@/components/project/";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import * as z from "zod";

type ProjectUpdateFromProps = {
  project?: any;
};

const ButtonSpinner = () => (
  <div className="flex flex-row items-center gap-4">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
    <p>Update Project</p>
  </div>
);

const ProjectUpdateFrom: FC<ProjectUpdateFromProps> = ({ project }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      type: project?.type || "OTHER",
      priority: project?.priority || "LOW",
      visibility: project?.visibility || "PUBLIC",
      stage: project?.stage || "CONCEPT",
      endDate: project?.endDate || null,
      figmaLink: project?.figmaLink || null,
      githubLink: project?.githubLink || null,
      devLink: project?.devLink || null,
      liveLink: project?.liveLink || null,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_API_URL}/projects/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            visibility: data.visibility,
            stage: data.stage,
            endDate: data.endDate,
            figmaLink: data.figmaLink,
            githubLink: data.githubLink,
            devLink: data.devLink,
            liveLink: data.liveLink,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      toast.success("Project updated successfully");
      reset({ ...json.data });
      mutate(`${process.env.NEXT_API_URL}/projects/${json.data.slug}/`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your project name"
                      autoComplete="off"
                      {...field}
                      className="bg-muted border-none text-2xl font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none text-base bg-muted border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectType form={form} />
            <ProjectPriority form={form} />
            <ProjectVisibility form={form} />
            <ProjectCurrentStage form={form} />
            <ProjectEndDate form={form} />
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectSocialLink form={form} name="githubLink" />
            <ProjectSocialLink form={form} name="figmaLink" />
            <ProjectSocialLink form={form} name="devLink" />
            <ProjectSocialLink form={form} name="liveLink" />
          </div>
          <Separator />
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="mt-auto"
          >
            {isLoading ? <ButtonSpinner /> : "Update Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProjectUpdateFrom;
