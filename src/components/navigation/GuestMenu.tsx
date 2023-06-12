"use client";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  RiArrowDownSLine,
  RiEarthLine,
  RiLightbulbFlashLine,
  RiSettings3Line,
  RiShieldFlashLine,
  RiUserAddLine,
  RiUserFollowLine,
} from "react-icons/ri";

const MENU_PRIMARY = [
  {
    label: "Sign In",
    icon: RiUserFollowLine,
    href: "/signin",
  },
  {
    label: "Sign Up",
    icon: RiUserAddLine,
    href: "/signup",
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

const Divider = () => {
  return <div className="border-t border-slate-700 my-2" />;
};

const GuestMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`w-full py-3 px-8 text-center duration-500 bg-[length:200%_auto] text-sm text-slate-100 rounded-md font-normal shadow-sm bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 cursor-pointer select-none touch-manipulation hover:bg-right-top focus-rose`}
      >
        Explore Now
        <RiArrowDownSLine className="inline-block ml-2" size="1.25rem" />
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
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-slate-800 shadow-sm ">
          <div className="p-2">
            <NavigationMenu items={MENU_PRIMARY} />
            <Divider />
            <NavigationMenu items={MENU_SECONDARY} />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default GuestMenu;
