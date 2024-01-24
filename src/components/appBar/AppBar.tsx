import {
  GuestDropdownMenu,
  ThemeToggle,
  UserDropdownMenu,
} from "@/components/appBar";
import { Button } from "@/components/ui/button";
import { Coffee, FolderGit2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Link href="/">
        <Coffee
          className="w-7 h-7 text-gradient-to-r from-primary via-primary/80 to-primary hover:scale-110 transform transition-all duration-300"
          strokeWidth={1.75}
        />
      </Link>
      <Link
        href="https://sizar.io"
        target="_blank"
        className="text-primary text-base font-medium hover:underline"
      >
        sizar.io
      </Link>
    </div>
  );
};

const AppBar = ({ user }: { user: Session["user"] }) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl h-14">
      <nav className="flex items-center justify-between p-2 sm:px-6 h-full">
        <Logo />
        <div className="flex items-center gap-3">
          {/* 
          // TODO: Remove this link when the projects page is ready
          */}
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              className="aspect-square p-0 text-primary hover:text-primary/80"
            >
              <FolderGit2 className="w-5 h-5" strokeWidth={1.75} />
            </Button>
          </Link>
          <ThemeToggle />
          {user ? <UserDropdownMenu user={user} /> : <GuestDropdownMenu />}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
