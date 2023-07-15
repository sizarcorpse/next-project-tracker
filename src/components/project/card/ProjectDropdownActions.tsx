import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreVertical, Trash, View } from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectDropdownActions = ({ projectSlug: slug }: any) => {
  const router = useRouter();

  const handleEdit = () => {
    try {
      router.push(`/projects/${slug}/update`);
    } catch (error) {
      return error;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group p-1 h-auto">
          <span className="sr-only">Actions</span>
          <MoreVertical className="h-4 w-4 text-secondary group-hover:text-secondary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="w-full inline-flex item-center justify-between cursor-pointer"
          onClick={() => router.push(`/projects/${slug}`)}
        >
          View
          <View className="h-4 w-4 mr-1" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full inline-flex item-center justify-between cursor-pointer"
          onClick={handleEdit}
        >
          Edit
          <Edit className="h-4 w-4 mr-1" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full inline-flex items-center justify-between cursor-pointer">
          Delete
          <Trash className="h-4 w-4 mr-1" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectDropdownActions;
