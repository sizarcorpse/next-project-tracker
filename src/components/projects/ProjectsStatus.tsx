"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleProjectsQuery } from "@/hooks/projects";
import { projectStatus } from "@/utils/projectsProperties";
import { useSearchParams } from "next/navigation";

const ProjectsStatus = () => {
  const searchParams = useSearchParams();
  const handleProjectsQuery = useHandleProjectsQuery();

  const handleSortValue = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(query);
  };

  return (
    <div className="flex gap-4 items-center">
      <Select
        onValueChange={(value: string) => handleProjectsQuery("status", value)}
        defaultValue={handleSortValue("status") || "active"}
      >
        <SelectTrigger
          hideIndicator
          className="border-none bg-primary/5 rounded-xl"
        >
          <SelectValue
            className="flex items-center gap-2"
            placeholder="Active"
          />
        </SelectTrigger>
        <SelectContent className="w-64">
          <SelectGroup>
            <SelectLabel className="flex flex-col gap-2 px-2">
              Projects Status
              <span className="font-normal text-xs text-popover-foreground">
                Select a projects status to filter projects by.
              </span>
            </SelectLabel>
          </SelectGroup>
          <SelectSeparator />
          {projectStatus.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              <div className="inline-flex gap-2 items-center">
                {option.icon}
                <span className="text-normal">{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectsStatus;
