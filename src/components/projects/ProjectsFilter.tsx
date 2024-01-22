"use client";

import {
  projectPriorities,
  projectStages,
  projectTypes,
} from "@/utils/projectsProperties";

import {
  Combine,
  FolderOpenDot,
  ListFilter,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/libs/utils";

const ProjectsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFilterActive = () => {
    const params = new URLSearchParams(searchParams.toString());
    return params.has("type") || params.has("priority") || params.has("stage");
  };

  const handleCheckBoxChecked = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.getAll(query).includes(value);
  };

  const handleProjectsQuery = useCallback(
    (queryParam: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.getAll(queryParam).includes(value)) {
        params.delete(queryParam, value);
      } else {
        params.append(queryParam, value);
      }

      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  const handleResetQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("priority");
    params.delete("stage");
    router.push(pathname + "?" + params.toString());
  }, [pathname, router, searchParams]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-3 bg-primary/5">
            <SlidersHorizontal
              className={cn(`w-4 h-4`, isFilterActive() && "text-success")}
              strokeWidth={1.5}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-2">
              Filter Projects
              <span className="font-normal text-xs text-popover-foreground">
                Filter projects by type, priority, stage, and other attributes.
              </span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* Type */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuLabel className="px-0 py-0.5 font-normal flex items-center gap-2">
                  <FolderOpenDot className="w-4 h-4" strokeWidth={1.5} />
                  Project Type
                </DropdownMenuLabel>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48">
                  {projectTypes.map((pt) => (
                    <DropdownMenuCheckboxItem
                      key={pt.value}
                      checked={handleCheckBoxChecked("type", pt.value)}
                      onCheckedChange={() =>
                        handleProjectsQuery("type", pt.value)
                      }
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {pt.icon}
                        {pt.label}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Priority */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuLabel className="px-0 py-0.5 font-normal flex items-center gap-2">
                  <Trophy className="w-4 h-4" strokeWidth={1.5} />
                  Project Priority
                </DropdownMenuLabel>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48">
                  {projectPriorities.map((pp) => (
                    <DropdownMenuCheckboxItem
                      key={pp.value}
                      checked={handleCheckBoxChecked("priority", pp.value)}
                      onCheckedChange={() =>
                        handleProjectsQuery("priority", pp.value)
                      }
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {pp.icon}
                        {pp.label}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Stage */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuLabel className="px-0 py-0.5 font-normal flex items-center gap-2">
                  <Combine className="w-4 h-4" strokeWidth={1.5} />
                  Project Stage
                </DropdownMenuLabel>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48">
                  {projectStages.map((ps) => (
                    <DropdownMenuCheckboxItem
                      key={ps.value}
                      checked={handleCheckBoxChecked("stage", ps.value)}
                      onCheckedChange={() =>
                        handleProjectsQuery("stage", ps.value)
                      }
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {ps.icon}
                        {ps.label}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* Reset Filters */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleResetQuery}
              className="cursor-pointer"
              disabled={!isFilterActive()}
            >
              <DropdownMenuLabel className="px-0 py-0.5 font-normal flex items-center gap-2">
                <ListFilter
                  className={cn(
                    `w-4 h-4`,
                    isFilterActive() && "text-destructive"
                  )}
                  strokeWidth={1.5}
                />
                Reset Filters
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectsFilter;
