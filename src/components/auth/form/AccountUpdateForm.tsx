"use client";

import {
  FormControl,
  FormDataFetchError,
  FormGroup,
} from "@/components/auth/form/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR from "swr";

const inputFieldStyles = (errors: any, field: any, isIcon?: boolean) => {
  return `w-full ${
    isIcon ? "pl-10 py-4 pr-4" : "p-4"
  }  bg-slate-200 border rounded-md outline-none text-sm text-slate-800 font-normal disabled:opacity-70 disabled:cursor-not-allowed placeholder:font-normal placeholder:text-slate-400 ${
    errors[field]?.message ? "border-rose-700" : "border-transparent"
  }`;
};

const AccountUpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    data: user,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_API_URL}/user`);
  const { data: session, update } = useSession();
  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      currentPassword: "",
      newPassword: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = form;

  const watchCurrentPassword = watch("currentPassword");

  useEffect(() => {
    if (user) {
      reset(user.data);
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_API_URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          email: data.email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      await update({
        ...session,
        user: {
          ...session?.user,
          name: json.data.name,
          username: json.data.username,
          email: json.data.email,
        },
      });
      setIsLoading(false);
      mutate();
      router.refresh();
      toast.success("Account updated successfully");
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  if (error) {
    return <FormDataFetchError />;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          <FormGroup title="User Information">
            <FormControl id="name" errors={errors} dirtyFields={dirtyFields}>
              <input
                id="name"
                disabled={isLoading}
                {...register("name")}
                placeholder="Name"
                type="text"
                className={inputFieldStyles(errors, "name")}
              />
            </FormControl>
          </FormGroup>
          <FormGroup
            title="Username"
            subtitle="Your `username` must have to unique and alphanumeric. `username` cant not start with a digit and must contain only lowercase letters, digits, underscore and dot [a-z0-9_.]"
          >
            <FormControl
              id="username"
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="username"
                disabled={isLoading}
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Username must be less than 16 characters",
                  },
                  pattern: {
                    value: /^(?!^\d)[a-z0-9_.]{1,15}$/i,
                    message: "Username must be alphanumeric",
                  },
                  validate: {
                    isUsernameAvailable: async (value) => {
                      const res = await fetch(
                        `${process.env.NEXT_API_URL}/user/check?username=${value}`
                      );
                      const isAvailable = await res.json();
                      if (isAvailable.data && value !== user.data.username) {
                        return `${value} is already taken`;
                      }
                    },
                  },
                })}
                placeholder="Username"
                type="text"
                className={inputFieldStyles(errors, "username")}
              />
            </FormControl>
          </FormGroup>
          <FormGroup
            title="Email"
            subtitle="Your `email` must have to unique and valid. Only gmail, outlook, hotmail, yahoo and proton are allowed. This `email` will only visible to you."
          >
            <FormControl id="email" errors={errors} dirtyFields={dirtyFields}>
              <input
                id="email"
                disabled={isLoading}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|proton)\.[a-zA-Z]{2,}$/i,
                    message: "Email must be a valid email address.",
                  },
                  validate: {
                    isUsernameAvailable: async (value) => {
                      const res = await fetch(
                        `${process.env.NEXT_API_URL}/user/check?email=${value}`
                      );
                      const isAvailable = await res.json();
                      if (isAvailable.data && value !== user.data.email) {
                        return `${value} is already taken`;
                      }
                    },
                  },
                })}
                placeholder="Email"
                type="text"
                className={inputFieldStyles(errors, "email")}
              />
            </FormControl>
          </FormGroup>
          <FormGroup
            title="Password"
            subtitle="Only credential user can change their password. OAuth can not set password."
          >
            <FormControl
              id="currentPassword"
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="currentPassword"
                disabled={isLoading}
                {...register("currentPassword", {})}
                placeholder="Current Password"
                type="password"
                className={inputFieldStyles(errors, "currentPassword")}
              />
            </FormControl>
            <FormControl
              id="newPassword"
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="newPassword"
                disabled={isLoading}
                {...register("newPassword", {
                  required: {
                    value: watchCurrentPassword === "" ? false : true,
                    message: "New Password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character `tyUjs&6Y98`",
                  },
                  validate: {
                    isPasswordMatch: (value) => {
                      if (value === watchCurrentPassword) {
                        return "New Password must be different from Current Password";
                      }
                    },
                  },
                })}
                placeholder="New Password"
                type="password"
                className={inputFieldStyles(errors, "newPassword")}
              />
            </FormControl>
          </FormGroup>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full">
              <button
                disabled={isLoading || !isDirty || !isValid}
                type="submit"
                title="Signup Button"
                className="w-full py-4 px-8 text-center duration-500 bg-[length:200%_auto] text-light rounded-md font-semibold shadow-md bg-gradient-to-r from-red-500 via-amber-500 to-red-500 cursor-pointer select-none touch-manipulation hover:bg-right-top focus-rose disabled:bg-gradient-to-r disabled:from-zinc-500 disabled:via-slate-500 disabled:to-zinc-500 disabled:cursor-not-allowed disabled:touch-manipulation disabled:hover:bg-right-top"
              >
                Update Account Setting
              </button>
            </div>
            <Link
              href="/profile"
              className="text-sm text-amber-500 font-semibold hover:text-rose-500"
            >
              Cancel Account Setting
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountUpdateForm;
