"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user";
import { useHandleProjectsQuery } from "@/hooks/projects";
import { cn } from "@/libs/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const status = [
  {
    id: 1,
    value: "me",
    label: "@me",
  },
  {
    id: 2,
    value: "assigned",
    label: "@assigned",
  },
  {
    id: 3,
    value: "all",
    label: "@all",
  },
];

const ProjectsSignature = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const handleProjectsQuery = useHandleProjectsQuery();

  const handleGetCurrentStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get("si") === value;
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="inline-flex h-10 items-center justify-center rounded-xl bg-primary/5 p-1 text-muted-foreground gap-2">
        <UserAvatar
          src={session?.user?.image}
          size="small"
          alt={session?.user?.name}
        />
        <Separator orientation="vertical" className="h-6 bg-primary/20" />
        <div className="flex gap-0">
          {status.map((item) => (
            <Button
              variant="ghost"
              key={item.id}
              className={cn(
                `h-auto rounded-xl py-1.5 font-normal px-2`,
                handleGetCurrentStatus(item.value)
                  ? "bg-background text-foreground shadow-sm px-4 pointer-events-none"
                  : "ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
              onClick={() => handleProjectsQuery("si", item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSignature;
