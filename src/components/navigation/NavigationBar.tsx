"use client";

import { GuestMenu, UserMenu } from "@/components/navigation";
import { ThemeToggle } from "@/components/settings";
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
          className="text-gradient-to-r from-text-primary via-text-secondary to-text-text-primary"
          size="2rem"
        />
      </Link>
      <Link
        href="https://sizar.io"
        target="_blank"
        className="text-primary text-sm font-semibold"
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
    <header className="sticky top-0 z-30 bg-popover border-b border-border bg-opacity-50 backdrop-blur backdrop-filter firefox:bg-opacity-90">
      <div className="mx-auto max-w-8xl xl:px-8">
        <nav className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 xl:px-0">
          <Logo />
          <div className="flex items-center justify-end gap-3">
            <ThemeToggle />
            {user ? <UserMenu user={user as any} /> : <GuestMenu />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
