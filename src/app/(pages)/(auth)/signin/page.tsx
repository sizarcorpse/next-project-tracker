import { SignInForm } from "@/components/auth";
import LoginWithGithub from "@/components/auth/buttons/LoginWithGithub";
import Image from "next/image";
import Link from "next/link";

const Divider = () => {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="w-1/2 h-[0.5px] bg-zinc-400"></div>
      <p className="text-sm text-slate-200">or</p>
      <div className="w-1/2 h-[0.5px]  bg-zinc-400"></div>
    </div>
  );
};

const SignInPage = () => {
  return (
    <div className="container max-w-screen-xl flex flex-row items-center justify-center flex-wrap mx-auto bg-slate-900 rounded-lg">
      <div className="grow-1 shrink-1 basis-full order-2 px-4 py-8 md:basis-1/2 md:order-1 md:p-6 lg:p-16 xl:p-20">
        <div className="mb-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Create an account
          </h2>
          <LoginWithGithub />
        </div>
        <Divider />
        <div>
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-100">
              Sign up with email
            </h2>
            <span className="text-sm text-slate-200 ">
              Already have an account?{" "}
              <Link href="/signup" className="text-amber-300">
                Sign Up
              </Link>
            </span>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className="grow-1 shrink-1 basis-1/1 order-1 md:basis-1/2 md:order-2 md:p-4">
        <Image
          src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=100"
          alt="Sign In"
          width={1200}
          height={1200}
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg aspect-square md:aspect-auto xl:aspect-auto"
        />
      </div>
    </div>
  );
};

export default SignInPage;
