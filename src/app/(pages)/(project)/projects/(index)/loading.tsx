"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Skeleton className="h-60 w-full rounded-xl" key={i} />
          ))}
      </div>
    </div>
  );
}
