import { Separator } from "@/components/ui/separator";
import { sanitizeUrl } from "@/utils";
import { Figma, FlaskRound, Github, Globe } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const links = [
  {
    id: "githubLink",
    label: "Github",
    placeholder: "Enter your github link",
    icon: <Github size={16} />,
  },
  {
    id: "figmaLink",
    label: "Figma",
    placeholder: "Enter your figma link",
    icon: <Figma size={16} />,
  },
  {
    id: "devLink",
    label: "Dev",
    placeholder: "Enter your dev link",
    icon: <FlaskRound size={16} />,
  },
  {
    id: "liveLink",
    label: "Live",
    placeholder: "Enter your live link",
    icon: <Globe size={16} />,
  },
];

type ProjectLinksDisplayProps = {
  githubLink?: string;
  figmaLink?: string;
  liveLink?: string;
  devLink?: string;
};

const ExternalProjectLink = ({ url, name }: any) => {
  const item = links.find((link) => link.id === name);

  return (
    <Link
      href={sanitizeUrl(url)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-secondary-foreground"
    >
      {item?.icon}
      {item?.label}
    </Link>
  );
};

const ProjectLinksDisplay: FC<ProjectLinksDisplayProps> = ({
  githubLink,
  figmaLink,
  liveLink,
  devLink,
}) => {
  if (!githubLink && !figmaLink && !liveLink && !devLink) return null;
  return (
    <div className="flex flex-row item-start justify-start gap-4">
      {githubLink && <ExternalProjectLink url={githubLink} name="githubLink" />}
      <Separator orientation="vertical" />
      {figmaLink && <ExternalProjectLink url={figmaLink} name="figmaLink" />}
      <Separator orientation="vertical" />
      {devLink && <ExternalProjectLink url={devLink} name="devLink" />}
      <Separator orientation="vertical" />
      {liveLink && <ExternalProjectLink url={liveLink} name="liveLink" />}
    </div>
  );
};

export default ProjectLinksDisplay;
