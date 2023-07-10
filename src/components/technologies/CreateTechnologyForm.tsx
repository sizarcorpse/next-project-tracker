"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { technologySchema } from "@/validators/";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import * as z from "zod";

type CreateTechnologyFormProps = {
  isNew?: boolean;
  technology?: any;
};

const CreateTechnologyForm: FC<CreateTechnologyFormProps> = ({
  isNew = true,
  technology,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof technologySchema>>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      name: technology ? technology.name : "",
      icon: technology ? technology.icon : "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  const createTechnology = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_API_URL}/technologies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          icon: data.icon,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      toast.success("Technology created successfully!");
      reset({
        name: "",
        icon: "",
      });
      mutate(`${process.env.NEXT_API_URL}/technologies`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const updateTechnology = async (data: any) => {};

  const onSubmit = async (data: any) => {
    if (isNew) {
      await createTechnology(data);
    } else {
      await updateTechnology(data);
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
                    placeholder="Name Of the Technology"
                    autoComplete="off"
                    {...field}
                    className="border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="icon"
                    placeholder="Icon Name"
                    autoComplete="off"
                    {...field}
                    className="border-none"
                  />
                </FormControl>
                <FormDescription>
                  You can find the icon name on the{" "}
                  <Link
                    href="https://simpleicons.org/"
                    target="_blank"
                    className="underline text-accent"
                  >
                    Icons
                  </Link>{" "}
                  page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || !isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTechnologyForm;
