"use client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const ProjectTagsDisplay = ({ tags }: any) => {
  const router = useRouter();

  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-1">
      {tags.map((tag: any) => (
        <Badge
          key={tag.id}
          className="bg-secondary hover:bg-secondary rounded-sm"
          onClick={() => router.push(`/tags/${tag.slug}`)}
        >
          <span className="text-xs text-secondary-foreground">{tag.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default ProjectTagsDisplay;
