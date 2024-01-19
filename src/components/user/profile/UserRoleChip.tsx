import { cn } from "@/libs/utils";

type Role = "ADMIN" | "USER" | "GUEST" | "PROJECT MANAGER" | "TEAM MEMBER";

type UserRoleChipProps = {
  role: string;
  size?: "sm";
};

const roleColors: Record<Role, { bg: string; text: string }> = {
  ADMIN: {
    bg: "bg-[#f43f5e]",
    text: "text-primary-foreground",
  },
  USER: {
    bg: "bg-primary",
    text: "text-primary-foreground",
  },
  GUEST: {
    bg: "bg-primary",
    text: "text-primary-foreground",
  },
  "PROJECT MANAGER": {
    bg: "bg-[#6366f1]",
    text: "text-primary-foreground",
  },
  "TEAM MEMBER": {
    bg: "bg-[#0ea5e9]",
    text: "text-primary-foreground",
  },
};

const UserRoleChip: React.FC<UserRoleChipProps> = ({ role, size }) => {
  return (
    <span
      className={cn(
        `text-sm px-4 py-1 rounded-3xl`,
        size === "sm" && "text-xs px-3",
        roleColors[role as keyof typeof roleColors].bg,
        roleColors[role as keyof typeof roleColors].text
      )}
    >
      {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
    </span>
  );
};

export default UserRoleChip;
