"use client";
import { signIn } from "next-auth/react";
import { VscGithubInverted } from "react-icons/vsc";

const LoginWithGithub = () => {
  return (
    <button
      className="w-full rounded-md bg-gradient-to-r from-red-500 via-amber-500 to-red-500 p-[1px]"
      onClick={() =>
        signIn("github", {
          callbackUrl: "/profile",
        })
      }
    >
      <div className="flex items-center justify-center gap-4 rounded-md text-gray px-4 py-2 bg-slate-900">
        <VscGithubInverted className="text-2xl text-slate-100" />
        <p className="text-slate-100 ">Sign in with Github</p>
      </div>
    </button>
  );
};

export default LoginWithGithub;
