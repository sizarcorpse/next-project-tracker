import { SignUpForm } from "@/components/auth";
import LoginWithGithub from "@/components/auth/buttons/LoginWithGithub";
import Image from "next/image";
import Link from "next/link";

const Divider = () => {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="w-1/2 h-[0.5px] bg-secondary"></div>
      <p className="text-sm text-card-foreground">or</p>
      <div className="w-1/2 h-[0.5px] bg-secondary"></div>
    </div>
  );
};

const SignUpPage = () => {
  return (
    <main className="w-full flex items-center justify-center p-0 md:p-6">
      <div className="container max-w-screen-lg flex flex-row items-center justify-center flex-wrap mx-auto bg-card rounded-none px-4 md:rounded-lg">
        <div className="grow-1 shrink-1 basis-full order-2 px-4 py-8 md:basis-1/2 md:order-1 md:p-6 lg:p-16">
          <div className="mb-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Create an account
            </h2>
            <LoginWithGithub />
          </div>
          <Divider />
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-card-foreground">
                Sign up with email
              </h2>
              <span className="text-sm text-card-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-muted-foreground">
                  Sign in
                </Link>
              </span>
            </div>
            <SignUpForm />
          </div>
        </div>
        <div className="grow-1 shrink-1 basis-1/1 order-1 md:basis-1/2 md:order-2 p-0 md:py-4">
          <Image
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Sign up"
            width={1200}
            height={1200}
            style={{
              objectFit: "cover",
            }}
            className="rounded-b-lg aspect-square sm:aspect-video md:aspect-auto md:rounded-lg xl:aspect-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
