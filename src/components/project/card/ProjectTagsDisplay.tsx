import { Badge } from "@/components/ui/badge";

const tags = [
  {
    id: 1,
    name: "Marking",
    slug: "marking",
  },
  {
    id: 2,
    name: "Coding",
    slug: "coding",
  },
  {
    id: 3,
    name: "Design",
    slug: "design",
  },
];
const ProjectTagsDisplay = ({ project }: any) => {
  return (
    <div className="flex flex-row items-center justify-start gap-1">
      {tags.map((tag: any) => (
        <Badge
          key={tag.id}
          className="bg-secondary hover:bg-secondary rounded-sm"
        >
          <span className="text-xs text-secondary-foreground">#{tag.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default ProjectTagsDisplay;
