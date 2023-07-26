"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Select, {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  components,
} from "react-select";
import AsyncSelect from "react-select/async";
import { mutate } from "swr";

const ProjectAddMembersForm = forwardRef((props: any, ref: any) => {
  const { projectId, members } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  console.log("ProjectAddMembersForm", props);

  const form = useForm({
    defaultValues: {
      members: [] || members,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  useEffect(() => {
    fetch(`${process.env.NEXT_API_URL}/members`)
      .then((response) => response.json())
      .then(({ data }) => {
        const options = data.map((member: any) => ({
          value: member.id,
          label: member.username,
          image: member.image,
          id: member.id,
        }));
        setOptions(options);
      });
  }, []);

  const loadOptions = (inputValue: string, callback: any) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_API_URL}/members?name=${inputValue}`)
      .then((response) => response.json())
      .then(({ data }) => {
        const options = data.map((member: any) => ({
          value: member.id,
          label: member.username,
          image: member.image,
          id: member.id,
        }));
        setOptions(options);
        setIsLoading(false);
        callback(options);
      });
  };

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
            members: data.members.map((technology: any) => ({
              id: technology.value,
            })),
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
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center justify-between gap-4 h-[27px]">
                  <div className="flex items-center justify-start gap-2">
                    <p>Project Tech{projectId}</p>
                  </div>
                </FormLabel>
                <FormControl>
                  <AsyncSelect
                    value={field.value}
                    onChange={(value: any) => {
                      form.setValue("members", value);
                    }}
                    cacheOptions
                    defaultOptions={options}
                    loadOptions={loadOptions}
                    options={options}
                    id="members"
                    isMulti
                    placeholder="Select your technologies"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={!isValid || isLoading}
          >
            Add Members
          </Button>
        </form>
      </Form>
    </div>
  );
});

ProjectAddMembersForm.displayName = "ProjectAddMembersForm";

export default ProjectAddMembersForm;
