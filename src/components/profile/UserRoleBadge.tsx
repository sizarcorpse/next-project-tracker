import { Badge } from "@/components/ui/badge";

type UserRoleBadgeProps = {
  role: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
};

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role, variant }) => {
  return (
    <Badge className="text-xs" variant={variant}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};

export default UserRoleBadge;
