"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

const ProjectTagCard = ({ tag }: any) => {
  const [showDelete, setShowDelete] = useState(false);
  const { project } = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_API_URL}/projects/${project}/tags/${tag.id}`,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      toast.success("Tag deleted successfully.");
      mutate(`${process.env.NEXT_API_URL}/projects/${project}/tags`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Badge
      className="p-0 rounded-sm bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <span
        className="text-sm p-2"
        onClick={() => router.push(`/tags/${tag.slug}`)}
      >
        {tag.name}
      </span>

      {showDelete && (
        <>
          <Separator orientation="vertical" className="h-4" />
          <Button
            className="mx-2 h-auto p-1 text-sm bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
            variant="ghost"
            onClick={handleDelete}
          >
            <X size={12} />
          </Button>
        </>
      )}
    </Badge>
  );
};

export default ProjectTagCard;
