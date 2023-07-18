"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Figma, FlaskRound, Github, Globe } from "lucide-react";
import { useState } from "react";

const links = [
  {
    id: "githubLink",
    label: "Github",
    placeholder: "Enter your github link",
    icon: <Github size={16} />,
  },
  {
    id: "figmaLink",
    label: "Figma",
    placeholder: "Enter your figma link",
    icon: <Figma size={16} />,
  },
  {
    id: "devLink",
    label: "Dev",
    placeholder: "Enter your dev link",
    icon: <FlaskRound size={16} />,
  },
  {
    id: "liveLink",
    label: "Live",
    placeholder: "Enter your live link",
    icon: <Globe size={16} />,
  },
];

const ProjectSocialLink = ({ form, name }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              className={`flex items-center bg-muted rounded-md h-auto px-3 ${
                isFocused &&
                "ring-offset-background ring-2 ring-ring ring-offset-2"
              }`}
            >
              <div className="flex items-center">
                {links.find((link) => link.id === name)?.icon}
              </div>
              <Input
                {...field}
                value={field.value === null ? "" : field.value}
                placeholder={
                  links.find((link) => link.id === name)?.placeholder
                }
                autoComplete="off"
                className="bg-muted border-none text-base focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProjectSocialLink;
