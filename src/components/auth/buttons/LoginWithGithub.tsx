"use client";

import { signIn } from "next-auth/react";
import { VscGithubInverted } from "react-icons/vsc";

const LoginWithGithub = () => {
  return (
    <button
      className="w-full rounded-md  p-[1px]"
      onClick={() =>
        signIn("github", {
          callbackUrl: "/",
        })
      }
    >
      <div className="flex items-center justify-center gap-4 rounded-md text-gray px-4 py-2 bg-primary">
        <VscGithubInverted className="text-2xl text-primary-foreground" />
        <p className="text-primary-foreground">Sign in with Github</p>
      </div>
    </button>
  );
};

export default LoginWithGithub;
