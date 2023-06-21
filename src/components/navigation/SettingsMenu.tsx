"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiUserLine, RiUserSettingsLine } from "react-icons/ri";

const MENU_PRIMARY = [
  {
    label: "Profile Settings",
    icon: RiUserLine,
    href: "/u/profile-settings",
  },
  {
    label: "Account Settings",
    icon: RiUserSettingsLine,
    href: "/u/account-settings",
  },
];

const Divider = () => {
  return <div className="border-t border-slate-200 w-full my-2" />;
};

const SettingsMenu = ({ image }: { image: string }) => {
  const path = usePathname();

  const handleActiveMenu = (cp: string) => cp === path;

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-start">
      <div className="flex gap-4 items-center justify-start">
        <Image
          src={image || "/assets/images/default-avatar.jpeg"}
          alt={"default"}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <p className="text-bae text-slate-800 font-bold">Settings</p>
      </div>

      <Divider />

      <div className="flex flex-row gap-2 items-start justify-start md:flex-col">
        {MENU_PRIMARY.map((item, index) => {
          const Icon = item.icon;
          const isActive = handleActiveMenu(item.href);
          return (
            <Link
              href={item.href}
              key={index}
              className="flex flex-row items-center gap-2 px-1 p-2 text-sm font-medium rounded-md"
            >
              <Icon
                className={`${isActive ? "text-amber-500" : "text-slate-400 "}`}
                size="1.25rem"
              />
              <span className="hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsMenu;
