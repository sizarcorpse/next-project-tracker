"use client";

import { Svg } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDown, Cpu, X } from "lucide-react";
import { useEffect, useState } from "react";
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

type Technology = {
  id: string;
  value: string;
  label: string;
  icon: string;
};

const Option = (props: OptionProps<Technology>) => (
  <components.Option {...props}>
    <Card className="group w-max flex flex-row items-center py-2 px-4 gap-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
      <Svg
        className="w-4 h-4 fill-card-foreground group-hover:fill-primary-foreground"
        url={props.data.icon}
      />
      <CardTitle className="text-sm font-normal">{props.data.label}</CardTitle>
    </Card>
  </components.Option>
);

const MultiValueLabel = (props: MultiValueGenericProps<Technology>) => (
  <components.MultiValueLabel {...props}>
    <div className="flex flex-row items-center justify-start gap-2">
      <Svg
        className="w-4 h-4 group-hover:fill-primary-foreground"
        url={props.data.icon}
      />
      <CardTitle className="text-sm font-normal group-hover:text-primary-foreground">
        {props.data.label}
      </CardTitle>
    </div>
  </components.MultiValueLabel>
);

const MultiValueRemove = (props: MultiValueRemoveProps<Technology>) => {
  return (
    <components.MultiValueRemove {...props}>
      <span className="h-auto p-1 text-sm rounded-sm text-destructive-foreground group-hover:bg-destructive  hover:bg-secondary hover:text-destructive-foreground">
        <X size={12} />
      </span>
    </components.MultiValueRemove>
  );
};

const MultiValueContainer = (props: MultiValueGenericProps<Technology>) => {
  return (
    <components.MultiValueContainer {...props}>
      <div className="group flex flex-row items-center py-1 px-2 gap-2 border border-border rounded-lg cursor-pointer bg-card hover:bg-primary">
        {props.children}
      </div>
    </components.MultiValueContainer>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className="flex flex-row items-center justify-center gap-2 group/hover-control:text-red-900">
        <ChevronDown size={16} className="opacity-50" />
      </div>
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<Technology>) => {
  return <span {...innerProps} />;
};

const ClearIndicator = ({ innerProps }: ClearIndicatorProps<Technology>) => {
  return (
    <span {...innerProps}>
      <Button variant="ghost" className="text-sm p-2 h-auto">
        Clear
      </Button>
    </span>
  );
};

const Control = ({ children, ...props }: ControlProps<Technology>) => {
  return (
    <components.Control
      {...props}
      className="group/control flex flex-row items-center pl-3 pr-0 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
    >
      <span>
        <Cpu size={16} />
      </span>
      {children}
    </components.Control>
  );
};

const ProjectTechnology = ({ form }: any) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_API_URL}/technologies`)
      .then((response) => response.json())
      .then(({ data }) => {
        const options = data.technologies.map((technology: Technology) => ({
          value: technology.id,
          label: technology.label,
          icon: technology.icon,
          id: technology.id,
        }));
        setOptions(options);
      });
  }, []);

  return (
    <FormField
      control={form.control}
      name="technologies"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center justify-between gap-4 h-[27px]">
            <div className="flex items-center justify-start gap-2">
              <p>Project Tech</p>
            </div>
          </FormLabel>
          <FormControl>
            <Select
              {...field}
              options={options}
              isMulti
              placeholder="Select your technologies"
              components={{
                Option: Option,
                MultiValueContainer,
                MultiValueLabel,
                MultiValueRemove,
                DropdownIndicator: DropdownIndicator,
                IndicatorSeparator: IndicatorSeparator,
                ClearIndicator: ClearIndicator,
                Control: Control,
              }}
              styles={{
                input: (base, props) => ({
                  ...base,
                  margin: "0px",
                  padding: "0px",
                }),
                multiValueRemove: (base, state) => ({
                  ...base,
                  padding: "0px",
                  background: "transparent",
                  "&:hover": {
                    background: "transparent",
                  },
                }),
                multiValue: (base, props) => ({
                  ...base,
                  background: "transparent",
                }),
                control: (base, props) => ({
                  ...base,
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "hsl(var(--muted))",
                  "&:hover": {
                    border: "none",
                    boxShadow: "none",
                  },
                }),
                menu(base, props) {
                  return {
                    ...base,
                    backgroundColor: "hsl(var(--muted))",
                    padding: "0px",
                  };
                },
                valueContainer(base, props) {
                  return {
                    ...base,
                    padding: "0px 4px",
                    margin: "0px",
                  };
                },
                placeholder: (base, props) => ({
                  ...base,
                  margin: "0px",
                  padding: "0px 4px",
                  color: "hsl(var(--muted-foreground))",
                }),
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProjectTechnology;
