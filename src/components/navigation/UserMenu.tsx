"use client";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  RiDashboardLine,
  RiEarthLine,
  RiLightbulbFlashLine,
  RiLogoutCircleRLine,
  RiSettings3Line,
  RiShieldFlashLine,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";

const MENU_PRIMARY = [
  {
    label: "Profile",
    icon: RiUserLine,
    href: "/profile",
  },
  {
    label: "Account Settings",
    icon: RiUserSettingsLine,
    href: "/accounts",
  },
  {
    label: "Dashboard",
    icon: RiDashboardLine,
    href: "/dashboard",
  },
];

const MENU_SECONDARY = [
  {
    label: "Help",
    icon: RiLightbulbFlashLine,
    href: "/help",
  },
  {
    label: "Language",
    icon: RiEarthLine,
    href: "/language",
  },
  {
    label: "Settings",
    icon: RiSettings3Line,
    href: "/settings",
  },
  {
    label: "Privacy Policy",
    icon: RiShieldFlashLine,
    href: "/privacy",
  },
];

const NavigationMenu = ({ items }: any) => {
  return (
    <>
      {items.map((item: any, index: any) => {
        const Icon = item.icon;
        return (
          <Menu.Item key={index}>
            {({ active }) => (
              <Link
                href={item.href}
                className={`${
                  active ? "bg-slate-200 text-slate-600" : "text-slate-100"
                } flex flex-row items-center gap-2 px-4 py-2 text-sm font-medium rounded-md`}
              >
                <Icon
                  className={`${active ? "text-amber-400" : "text-slate-400"}`}
                  size="1.25rem"
                />
                <span>{item.label}</span>
              </Link>
            )}
          </Menu.Item>
        );
      })}
    </>
  );
};

const ProfileMiniCard = ({ user }: any) => {
  const { name, image, email } = user || {};
  return (
    <article className="w-full flex flex-row items-center justify-between gap-4">
      <div className="basis-16">
        <Image
          src={image || "/assets/images/default-avatar.jpeg"}
          alt="avatar"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <div className="basis-44">
        <h3 className="text-base font-medium text-slate-100">{name}</h3>
        <p className="text-sm font-medium text-slate-100">{email}</p>
      </div>
    </article>
  );
};

const SingOutBox = () => {
  return (
    <Menu.Item>
      <button
        type="button"
        title="Sign out"
        onClick={() => signOut()}
        className="text-sm text-slate-100 text-center flex flex-row items-center justify-between rounded-md cursor-pointer px-4 py-2 gap-4 bg-slate-950 w-full hover:bg-rose-600"
      >
        Sign me out
        <RiLogoutCircleRLine size="1rem" />
      </button>
    </Menu.Item>
  );
};

const Divider = () => {
  return <div className="border-t border-slate-700 my-2" />;
};

const UserMenu = ({ user }: any) => {
  const { image } = user || {};
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full w-auto flex items-center">
        <Image
          src={image || "/assets/images/default-avatar.jpeg"}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-250"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-250"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-slate-800 shadow-dropdown-shadow ">
          <div className="p-2">
            <Menu.Item>
              <div className="group flex flex-row rounded-md cursor-pointer p-2 gap-4 transition-colors duration-200 hover:bg-light">
                <ProfileMiniCard user={user} />
              </div>
            </Menu.Item>
            <Divider />
            <NavigationMenu items={MENU_PRIMARY} />
            <Divider />
            <NavigationMenu items={MENU_SECONDARY} />
            <Divider />
            {user && <SingOutBox />}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
