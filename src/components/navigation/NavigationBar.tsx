"use client";

import { GuestMenu, UserMenu } from "@/components/navigation";
import { User } from "@prisma/client";
import Link from "next/link";
import { SiCoffeescript } from "react-icons/si";

interface NavigationBarProps {
  user: User;
}

const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Link href="/">
        <SiCoffeescript
          className="text-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
          size="2rem"
        />
      </Link>
      <Link
        href="https://sizar.io"
        target="_blank"
        className="text-slate-900 text-sm font-semibold"
      >
        sizar.io
      </Link>
    </div>
  );
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  user,
}: {
  user: any;
}) => {
  return (
    <header className="sticky top-0 z-30 bg-gray-100 bg-opacity-50 backdrop-blur backdrop-filter firefox:bg-opacity-90">
      <div className="mx-auto max-w-8xl xl:px-8">
        <nav className="flex items-center justify-between p-4 sm:px-6 lg:px-8 xl:px-0">
          <Logo />
          {user ? <UserMenu user={user as any} /> : <GuestMenu />}
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
