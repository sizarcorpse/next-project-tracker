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
import {
  ArrowUpZA,
  CalendarCheck,
  CalendarX,
  Combine,
  FolderOpenDot,
  Trophy,
  Type,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sortOptions = {
  group_a: [
    {
      label: "Project Type",
      value: "type",
      icon: <FolderOpenDot className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Project Priority",
      value: "priority",
      icon: <Trophy className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Project Stage",
      value: "stage",
      icon: <Combine className="w-4 h-4" strokeWidth={1.5} />,
    },
  ],
  group_b: [
    {
      label: "Title",
      value: "title",
      icon: <Type className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Start Date",
      value: "startDate",
      icon: <CalendarCheck className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "End Date",
      value: "endDate",
      icon: <CalendarX className="w-4 h-4" strokeWidth={1.5} />,
    },
  ],
};

const ProjectsSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortValue = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(query);
  };

  const handleProjectsSort = useCallback(
    (queryParam: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(queryParam, value);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(v) => handleProjectsSort("sort", v)}
        defaultValue={handleSortValue("sort") || "title"}
      >
        <SelectTrigger
          className="w-auto px-3 border-none bg-primary/5"
          hideIndicator
        >
          <ArrowUpZA className="w-4 h-4" strokeWidth={1.5} />
        </SelectTrigger>
        <SelectContent className="w-64">
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
              onValueChange={(v) => handleProjectsSort("order", v)}
              defaultValue={handleSortValue("order") || "asc"}
            >
              <div className="flex items-center space-x-2 py-1.5 rounded-sm hover:bg-accent px-2">
                <RadioGroupItem value="asc" id="asc" />
                <label
                  htmlFor="asc"
                  className="font-normal text-sm w-full cursor-pointer"
                >
                  Ascending
                </label>
              </div>
              <div className="flex items-center space-x-2 py-1.5 rounded-sm hover:bg-accent px-2">
                <RadioGroupItem value="desc" id="desc" />
                <label
                  htmlFor="desc"
                  className="font-normal text-sm w-full cursor-pointer"
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
