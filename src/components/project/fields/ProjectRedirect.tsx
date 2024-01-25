import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";

type ProjectRedirectProps = {
  setRedirect: (value: boolean) => void;
  value: boolean;
};

const ProjectRedirect: FC<ProjectRedirectProps> = ({ setRedirect, value }) => {
  const handleRedirect = (value: boolean) => {
    setRedirect(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="redirect-mode">
        Redirect to project page after creation.
      </Label>
      <Switch
        id="redirect-mode"
        onCheckedChange={handleRedirect}
        checked={value}
      />
    </div>
  );
};

export default ProjectRedirect;
