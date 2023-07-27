"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Users, X } from "lucide-react";
import Image from "next/image";
import { FC, forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  components,
} from "react-select";
import AsyncSelect from "react-select/async";
import { mutate } from "swr";

type Members = {
  id: string;
  value: string;
  label: string;
  image: string;
};
const Option = (props: OptionProps<Members>) => (
  <components.Option {...props}>
    <Card className="group flex flex-row items-center p-2 gap-2 border-none rounded-lg cursor-pointer bg-card hover:bg-muted">
      <Image
        src={props.data.image || "/assets/images/default-avatar.jpeg"}
        width={40}
        height={40}
        className="rounded-full"
        alt={props.data.label}
      />

      <div>
        <CardTitle className="text-sm font-normal text-card-foreground group-hover:text-muted-foreground">
          {props.data.label}
        </CardTitle>
      </div>
    </Card>
  </components.Option>
);

const MultiValueLabel = (props: MultiValueGenericProps<Members>) => (
  <components.MultiValueLabel {...props}>
    <div className="flex flex-row items-center justify-start gap-2">
      <Image
        src={props.data.image || "/assets/images/default-avatar.jpeg"}
        width={40}
        height={40}
        className="rounded-full"
        alt={props.data.label}
      />
      <span className="text-sm font-normal text-card-foreground group-hover:text-muted-foreground">
        {props.data.label}
      </span>
    </div>
  </components.MultiValueLabel>
);

const MultiValueRemove = (props: MultiValueRemoveProps<Members>) => {
  return (
    <components.MultiValueRemove {...props}>
      <span className="h-auto p-1 text-sm rounded-sm text-destructive-foreground group-hover:bg-destructive hover:bg-secondary hover:text-destructive-foreground">
        <X size={12} />
      </span>
    </components.MultiValueRemove>
  );
};

const MultiValueContainer = (props: MultiValueGenericProps<Members>) => {
  return (
    <components.MultiValueContainer {...props}>
      <Card className="group flex flex-row items-center py-1 px-2 gap-2 border-none rounded-lg cursor-pointer bg-card hover:bg-muted">
        {props.children}
      </Card>
    </components.MultiValueContainer>
  );
};

const valueFormatter = (value: any) => {
  return value.map((member: any) => ({
    value: member.id,
    label: member.username,
    image: member.image,
    id: member.id,
  }));
};

const ProjectAddMembersForm = forwardRef((props: any, ref: any) => {
  const { projectId, members } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState([]);

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
    if (members) {
      reset({
        members: valueFormatter(members),
      });
    }
  }, [members, reset]);

  useEffect(() => {
    fetch(`${process.env.NEXT_API_URL}/members`)
      .then((response) => response.json())
      .then(({ data }) => {
        const options = valueFormatter(data);
        setOptions(options);
      });
  }, []);

  const loadOptions = (inputValue: string, callback: any) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_API_URL}/members?name=${inputValue}`)
      .then((response) => response.json())
      .then(({ data }) => {
        const options = valueFormatter(data);
        setOptions(options);
        setIsLoading(false);
        callback(options);
      });
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_API_URL}/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            members: data.members.map((members: any) => ({
              id: members.value,
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
      reset({
        members: valueFormatter(json.data.members),
      });
      mutate(`${process.env.NEXT_API_URL}/projects/${json.data.slug}/`);
      mutate(`${process.env.NEXT_API_URL}/projects/`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-start gap-2 font-semibold text-xl">
                      <Users size={20} />
                      <p>Assign Member to the project.</p>
                    </div>
                    <p>
                      By default, the project creator is assigned to the
                      project. The members assigned to the project will be able
                      to view and edit the project.
                    </p>
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
                    placeholder="Select a member"
                    components={{
                      Option,
                      MultiValueContainer,
                      MultiValueLabel,
                      MultiValueRemove,
                      DropdownIndicator: () => null,
                      ClearIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      option: (base) => ({
                        ...base,
                        backgroundColor: "hsl(var(--popover))",
                        "&:hover": {
                          backgroundColor: "hsl(var(--popover))",
                        },
                      }),
                      input: (base) => ({
                        ...base,
                        margin: "0px",
                        minHeight: "54px",
                        backgroundColor: "hsl(var(--popover))",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        padding: "0px",
                        background: "transparent",
                        "&:hover": {
                          background: "transparent",
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        background: "transparent",
                      }),
                      control: (base) => ({
                        ...base,
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "hsl(var(--popover))",
                        padding: "4px 0px",
                        borderBottom: "1px solid hsl(var(--border))",
                        "&:hover": {
                          boxShadow: "none",
                          background: "hsl(var(--popover))",
                        },
                      }),
                      menu(base) {
                        return {
                          ...base,
                          backgroundColor: "hsl(var(--popover))",
                          padding: "0px",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "hsl(var(--popover))",
                          },
                        };
                      },
                      menuPortal: (base) => ({
                        ...base,
                        backgroundColor: "hsl(var(--popover))",
                        borderRadius: "8px",
                      }),
                      menuList: (base) => ({
                        ...base,
                        backgroundColor: "hsl(var(--popover))",
                        borderRadius: "8px",
                      }),
                      valueContainer(base) {
                        return {
                          ...base,
                          padding: "0px 0px",
                          margin: "0px",
                        };
                      },
                      placeholder: (base) => ({
                        ...base,
                        margin: "0px",
                        padding: "0px 4px",
                        color: "hsl(var(--muted-foreground))",
                      }),
                    }}
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
            Assigned Members
          </Button>
        </form>
      </Form>
    </div>
  );
});

ProjectAddMembersForm.displayName = "ProjectAddMembersForm";
export default ProjectAddMembersForm;
