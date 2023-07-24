"use client";

import { ProjectCreateTagForm, ProjectTagCard } from "@/components/project";
import { Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSwr from "swr";
import { Skeleton } from "../ui/skeleton";

const ProjectTagsCard = () => {
  const { project: project_slug } = useParams();
  const { data: tags, isLoading } = useSwr(
    `${process.env.NEXT_API_URL}/projects/${project_slug}/tags`
  );
  const [showCreateTagForm, setShowCreateTagForm] = useState(false);

  return (
    <div className="group w-full bg-card text-card-foreground rounded-md overflow-hidden p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row items-start justify-start gap-2 flex-wrap">
          {tags?.data?.map((tag: any) => (
            <ProjectTagCard key={tag.id} tag={tag} />
          )) || (
            <>
              {Array.from(Array(5).keys()).map((i) => (
                <Skeleton key={i} className="w-16 h-10" />
              ))}
            </>
          )}
          <button
            className="p-3 rounded-sm bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() => setShowCreateTagForm(!showCreateTagForm)}
          >
            {showCreateTagForm ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        </div>
        {showCreateTagForm && (
          <div className="w-full">
            <ProjectCreateTagForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTagsCard;
