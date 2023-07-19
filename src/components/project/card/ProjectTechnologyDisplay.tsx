import { TechnologyCard } from "@/components/technologies";

const ProjectTechnologyDisplay = ({ technologies }: any) => {
  return (
    <div className="pr-4 w-full flex flex-row items-start justify-start gap-2 flex-wrap">
      {technologies.map((item: any) => (
        <TechnologyCard key={item.id} item={item} className="py-1 px-2" />
      ))}
    </div>
  );
};

export default ProjectTechnologyDisplay;
