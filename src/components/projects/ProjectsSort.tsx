"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "@/components/ui/select";
import { useHandleProjectsQuery } from "@/hooks/projects";
import { sortOptions } from "@/utils/projectsProperties";
import { ArrowUpZA } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ProjectsSort = () => {
  const searchParams = useSearchParams();
  const handleProjectsQuery = useHandleProjectsQuery();

  const handleSortValue = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(query);
  };

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(v) => handleProjectsQuery("sort", v)}
        defaultValue={handleSortValue("sort") || "title"}
      >
        <SelectTrigger
          className="w-auto px-3 border-none bg-primary/5 rounded-xl"
          hideIndicator
        >
          <ArrowUpZA className="w-4 h-4" strokeWidth={1.5} />
        </SelectTrigger>
        <SelectContent className="w-64" align="end">
          <SelectGroup>
            <SelectLabel className="flex flex-col gap-2 px-2">
              Sort Projects
              <span className="font-normal text-xs text-popover-foreground">
                Sort projects by type, priority, stage, and other attributes.
              </span>
            </SelectLabel>
          </SelectGroup>
          <SelectSeparator />
          {Object.entries(sortOptions).map(([key, value]) => (
            <SelectGroup key={key}>
              {value.map((option: any) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  <div className="inline-flex gap-2">
                    {option.icon}
                    <span className="text-normal">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
              {key === "group_a" && <SelectSeparator />}
            </SelectGroup>
          ))}
          <SelectSeparator />
          <SelectGroup>
            <RadioGroup
              className="gap-y-0"
              onValueChange={(v) => handleProjectsQuery("order", v)}
              defaultValue={handleSortValue("order") || "asc"}
            >
              <div className="flex items-center space-x-2 rounded-sm hover:bg-accent px-2">
                <RadioGroupItem value="asc" id="asc" />
                <label
                  htmlFor="asc"
                  className="font-normal text-sm w-full cursor-pointer  py-1.5"
                >
                  Ascending
                </label>
              </div>
              <div className="flex items-center space-x-2 rounded-sm hover:bg-accent px-2">
                <RadioGroupItem value="desc" id="desc" />
                <label
                  htmlFor="desc"
                  className="font-normal text-sm w-full cursor-pointer  py-1.5"
                >
                  Descending
                </label>
              </div>
            </RadioGroup>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectsSort;
