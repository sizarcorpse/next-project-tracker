"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user";
import { cn } from "@/libs/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const status = [
  {
    id: 1,
    value: "me",
    label: "@me",
  },
  {
    id: 2,
    value: "assigned",
    label: "Assigned",
  },
];

const ProjectsSignature = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGetCurrentStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get("si") === value;
  };

  const handleProjectStatusQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("si", value);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="flex gap-4 items-center">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-primary/5 p-1 text-muted-foreground gap-2">
        <UserAvatar
          src={session?.user?.image}
          size="small"
          alt={session?.user?.name}
        />
        <Separator orientation="vertical" className="h-6 bg-primary/20" />
        <div className="flex gap-1">
          {status.map((item) => (
            <Button
              variant="ghost"
              key={item.id}
              className={cn(
                `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1.5 text-sm font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-auto bg-primary/5`,
                handleGetCurrentStatus(item.value) &&
                  "bg-background text-foreground shadow-sm"
              )}
              onClick={() => handleProjectStatusQuery(item.value)}
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
