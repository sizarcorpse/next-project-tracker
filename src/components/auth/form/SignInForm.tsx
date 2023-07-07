"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { RiKeyLine, RiMailOpenLine } from "react-icons/ri";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      setIsLoading(false);

      if (!res?.error) {
        toast.success("Logged in");
        router.refresh();
        router.push(callbackUrl);
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const onError = (error: FieldErrors<FieldValues>) => {
    console.log(error);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <div className="relative">
              <RiMailOpenLine
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${
                  errors.email?.message ? "text-destructive" : "text-primary"
                }`}
              />
              <input
                id="email"
                autoComplete="email"
                disabled={isLoading}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|proton)\.[a-zA-Z]{2,}$/i,
                    message:
                      "Email must be a valid email address. Only gmail, outlook, hotmail, yahoo and proton are allowed.",
                  },
                })}
                placeholder="Email"
                type="email"
                className={`w-full px-10 py-4 bg-input border rounded-md outline-none text-sm text-primary font-normal disabled:opacity-70 disabled:cursor-not-allowed placeholder:font-normal ${
                  errors.email?.message
                    ? "border-destructive"
                    : "border-transparent"
                }`}
              />
            </div>
            {errors.email?.message && (
              <div className="text-destructive text-xs mt-3 pl-4">
                {errors.email?.message as string}
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="relative">
              <RiKeyLine
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${
                  errors.password?.message ? "text-destructive" : "text-primary"
                }`}
              />
              <input
                id="password"
                disabled={isLoading}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character `tyUjs&6Y98`",
                  },
                })}
                placeholder="Password"
                autoComplete="current-password"
                type="password"
                className={`w-full px-10 py-4 bg-input border rounded-md outline-none text-sm text-primary font-normal disabled:opacity-70 disabled:cursor-not-allowed placeholder:font-normal ${
                  errors.password?.message
                    ? "border-destructive"
                    : "border-transparent"
                }`}
              />
            </div>
            {errors.password?.message && (
              <div className="text-destructive text-xs mt-3 pl-4">
                {errors.password?.message as string}
              </div>
            )}
          </div>
          <div className="w-full">
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              type="submit"
              title="Signup Button"
              className="w-full py-4 px-8 text-center duration-500 bg-[length:200%_auto] text-primary-foreground rounded-md font-semibold shadow-sm bg-primary cursor-pointer select-none touch-manipulation hover:bg-accent hover:text-accent-foreground focus-ring disabled:bg-secondary disabled:text-secondary-foreground disabled:cursor-not-allowed disabled:touch-manipulation"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
