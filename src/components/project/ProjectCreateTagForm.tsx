"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import * as z from "zod";

const tagSchema = z.object({
  name: z.string().min(2).nonempty({
    message: "Username is required.",
  }),
});

const ProjectCreateTagForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { project: project_slug } = useParams();
  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: "",
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
      const response = await fetch(
        `${process.env.NEXT_API_URL}/projects/${project_slug}/tags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      toast.success("Technology created successfully!");
      reset({
        name: "",
      });
      mutate(`${process.env.NEXT_API_URL}/projects/${project_slug}/tags`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Name of the Tag"
                    autoComplete="off"
                    {...field}
                    className="border-none bg-secondary text-secondary-foreground placeholder:text-secondary-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreateTagForm;
