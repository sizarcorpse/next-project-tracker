"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  ProjectCurrentStage,
  ProjectPriority,
  ProjectType,
  ProjectVisibility,
} from "@/components/project/";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const projectSchema = z.object({
  title: z.string().min(3, "Name should be at least 3 characters"),
  type: z.string().optional(),
  priority: z.string().optional(),
  visibility: z.string().optional(),
  stage: z.string().optional(),
});

const CreateProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
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
      const response = await fetch(`${process.env.NEXT_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          type: data.type,
          priority: data.priority,
          visibility: data.visibility,
          stage: data.stage,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      toast.success("Technology created successfully!");
      router.push(`/projects/${json.data.slug}/update`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col">
            <h2 className="text-4xl text-popover-foreground">
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
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="mt-auto"
          >
            {isLoading ? "Loading..." : "Create Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
