import { TechnologyCard } from "@/components/technologies";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectTechnologyDisplay = ({ technologies }: any) => {
  if (!technologies) {
    return <Skeleton className="h-9 w-full bg-muted" />;
  }
  if (technologies.length === 0) return null;
  return (
    <div className="pr-4 w-full flex flex-row items-start justify-start gap-2 flex-wrap">
      {technologies.map((item: any) => (
        <TechnologyCard key={item.id} item={item} className="py-1 px-2" />
      ))}
    </div>
  );
};

export default ProjectTechnologyDisplay;
