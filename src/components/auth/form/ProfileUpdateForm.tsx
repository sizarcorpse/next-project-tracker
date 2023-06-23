"use client";
import { Listbox } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IconType } from "react-icons/lib";
import {
  RiArrowDownSLine,
  RiContactsLine,
  RiFacebookLine,
  RiGithubLine,
  RiHotelLine,
  RiInformationLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiUserShared2Line,
  RiUserVoiceLine,
} from "react-icons/ri";
import useSWR from "swr";

const GENDER_DATA = [
  {
    id: 0,
    title: "Gender",
    value: "",
  },
  {
    id: 1,
    title: "Male",
    value: "Male",
  },
  {
    id: 2,
    title: "Female",
    value: "Female",
  },
  {
    id: 3,
    title: "Other",
    value: "Other",
  },
];

const FormGroup = ({
  children,
  icon,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  subtitle?: string;
}) => {
  const Icon = icon || RiInformationLine;
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-row items-center justify-start gap-2">
          <Icon className="text-slate-600" />
          <h4 className="text-sm font-semibold text-slate-600">{title}</h4>
        </div>
        {subtitle && (
          <span className="text-xs font-normal text-slate-500">{subtitle}</span>
        )}
      </div>
      {children}
    </div>
  );
};

const FormControl = ({
  children,
  id,
  errors,
  icon,
  dirtyFields,
}: {
  children: React.ReactNode;
  errors?: any;
  id: string;
  icon?: any;
  dirtyFields?: any;
}) => {
  const Icon = icon || undefined;
  return (
    <div className="w-full">
      <div className="relative">
        {Icon ? (
          <Icon
            className={`absolute top-1/2 left-4 transform -translate-y-1/2  ${
              dirtyFields && dirtyFields[id]
                ? "text-slate-800"
                : "text-slate-600"
            }`}
          />
        ) : (
          ""
        )}
        {children}
      </div>
      {errors && errors[id]?.message && (
        <div className="text-rose-700 text-xs mt-3 pl-4">
          {errors && (errors[id]?.message as string)}
        </div>
      )}
    </div>
  );
};

const inputFieldStyles = (errors: any, field: any, isIcon?: boolean) => {
  return `w-full ${
    isIcon ? "pl-10 py-4 pr-4" : "p-4"
  }  bg-slate-200 border rounded-md outline-none text-sm text-slate-800 font-normal disabled:opacity-70 disabled:cursor-not-allowed placeholder:font-normal placeholder:text-slate-400 ${
    errors[field]?.message ? "border-rose-700" : "border-transparent"
  }`;
};

const ProfileFetchError = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-md gap-8 bg-slate-200 sm:p-6 md:p-12 md:gap-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold text-center text-slate-800">
          Something went wrong
        </h2>
        <p className="text-sm text-center text-slate-800">
          We are unable to fetch your profile. Please try again after sometime.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          title="Retry"
          className="bg-slate-100 text-slate-800 text-sm font-semibold px-6 py-2 rounded-md hover:bg-amber-400 transition-colors"
          onClick={() => router.refresh()}
        >
          Retry
        </button>
        <button
          className="bg-slate-100 text-slate-800 text-sm font-semibold px-6 py-2 rounded-md hover:bg-emerald-400 transition-colors"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const ProfileUpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(GENDER_DATA[0]);

  const { data: profile, error, mutate } = useSWR("/api/user/profile");

  const form = useForm<FieldValues>({
    defaultValues: {
      designation: "",
      company: "",
      website: "",
      location: "",
      gender: "",
      bio: "",
      linkedin: "",
      github: "",
      twitter: "",
      facebook: "",
      instagram: "",
      contact: "",
    },
    mode: "onBlur",
  });

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting, dirtyFields },
  } = form;

  useEffect(() => {
    if (profile) {
      reset(profile.data);

      const g = GENDER_DATA.filter((item) => {
        return item.value === profile.data.gender;
      });
      if (g.length > 0) {
        setSelectedGender(g[0]);
      }
    }
  }, [profile, reset]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }
      toast.success(json.message);
      setIsLoading(false);
      mutate();
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  if (error) {
    return <ProfileFetchError />;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          <FormGroup title="Company Information" icon={RiHotelLine}>
            <FormControl
              id="designation"
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="designation"
                disabled={isLoading}
                {...register("designation")}
                placeholder="Designation"
                type="text"
                className={inputFieldStyles(errors, "designation")}
              />
            </FormControl>

            <FormControl id="company" errors={errors} dirtyFields={dirtyFields}>
              <input
                id="company"
                disabled={isLoading}
                {...register("company")}
                placeholder="Company Name"
                type="text"
                className={inputFieldStyles(errors, "company")}
              />
            </FormControl>
          </FormGroup>

          <FormGroup
            title="Contact Information"
            icon={RiContactsLine}
            subtitle="This will publicly show your email address on your profile."
          >
            <FormControl
              id="location"
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="location"
                disabled={isLoading}
                {...register("location")}
                placeholder="Location Name"
                type="text"
                className={inputFieldStyles(errors, "location")}
              />
            </FormControl>

            <FormControl id="contact" errors={errors} dirtyFields={dirtyFields}>
              <input
                id="contact"
                autoComplete="contact"
                disabled={isLoading}
                {...register("contact", {
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|proton)\.[a-zA-Z]{2,}$/i,
                    message:
                      "Email must be a valid email address. Only gmail, outlook, hotmail, yahoo and proton are allowed.",
                  },
                })}
                placeholder="Contact Email"
                type="email"
                className={inputFieldStyles(errors, "contact")}
              />
            </FormControl>

            <FormControl id="website" errors={errors} dirtyFields={dirtyFields}>
              <input
                id="website"
                autoComplete="website"
                disabled={isLoading}
                {...register("website", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$/i,
                    message:
                      "Website must be a valid website address. Only http and https are allowed.",
                  },
                })}
                placeholder="Website"
                type="text"
                className={inputFieldStyles(errors, "website")}
              />
            </FormControl>
          </FormGroup>

          <FormGroup title=" About Yourself" icon={RiUserVoiceLine}>
            <Listbox
              value={selectedGender}
              onChange={(e) => {
                setValue("gender", e.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setSelectedGender(e);
              }}
            >
              <div className="relative mt-1">
                <Listbox.Button className="w-full p-4 text-start bg-slate-200 border rounded-md outline-none text-sm text-slate-400 font-normal">
                  <span
                    className={`${
                      selectedGender.id === 0
                        ? "text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {selectedGender.title}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <RiArrowDownSLine
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 p-2 max-h-60 w-full overflow-auto rounded-md bg-white text-sm shadow-lg z-10 sm:text-sm">
                  {GENDER_DATA.map((gender) => (
                    <Listbox.Option
                      key={gender.id}
                      value={gender}
                      className={({ active }) =>
                        `relative select-none px-3 py-2 rounded-sm cursor-pointer ${
                          active
                            ? "bg-amber-400 text-slate-800"
                            : "text-slate-800"
                        }`
                      }
                    >
                      {gender.title}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            <FormControl id="bio" errors={errors} dirtyFields={dirtyFields}>
              <textarea
                id="bio"
                disabled={isLoading}
                {...register("bio", {
                  maxLength: { value: 500, message: "Max length exceeded" },
                })}
                rows={5}
                placeholder="What is in your mind ?"
                className={inputFieldStyles(errors, "bio")}
              />
            </FormControl>
          </FormGroup>

          <FormGroup
            title="Social Profiles"
            subtitle="Share your social account to others"
            icon={RiUserShared2Line}
          >
            <FormControl
              id="linkedin"
              icon={RiLinkedinLine}
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="linkedin"
                autoComplete="linkedin"
                disabled={isLoading}
                {...register("linkedin", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9\-_]+\/?$/i,
                    message: "Website must be a valid Linkedin username",
                  },
                })}
                placeholder="Linkedin"
                type="text"
                className={`${inputFieldStyles(errors, "linkedin")} px-10`}
              />
            </FormControl>

            <FormControl
              id="github"
              icon={RiGithubLine}
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="github"
                autoComplete="github"
                disabled={isLoading}
                {...register("github", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/i,
                    message: "Website must be a valid Github username",
                  },
                })}
                placeholder="Github"
                type="text"
                className={`${inputFieldStyles(errors, "github")} px-10`}
              />
            </FormControl>

            <FormControl
              id="twitter"
              icon={RiTwitterLine}
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="twitter"
                autoComplete="twitter"
                disabled={isLoading}
                {...register("twitter", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_\.]+\/?$/i,
                    message: "Website must be a valid Twitter username",
                  },
                })}
                placeholder="Twitter"
                type="text"
                className={`${inputFieldStyles(errors, "twitter")} px-10`}
              />
            </FormControl>

            <FormControl
              id="facebook"
              icon={RiFacebookLine}
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="facebook"
                autoComplete="facebook"
                disabled={isLoading}
                {...register("facebook", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?facebook\.com\/[a-z0-9_\.]+\/?$/i,
                    message: "Website must be a valid Facebook username",
                  },
                })}
                placeholder="Facebook"
                type="text"
                className={`${inputFieldStyles(errors, "facebook")} px-10`}
              />
            </FormControl>

            <FormControl
              id="instagram"
              icon={RiInstagramLine}
              errors={errors}
              dirtyFields={dirtyFields}
            >
              <input
                id="instagram"
                autoComplete="instagram"
                disabled={isLoading}
                {...register("instagram", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?instagram\.com\/[a-z0-9_\.]+\/?$/i,
                    message: "Website must be a valid Instagram username",
                  },
                })}
                placeholder="Instagram"
                type="text"
                className={`${inputFieldStyles(errors, "instagram", true)}`}
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
                Update Profile
              </button>
            </div>
            <Link
              href="/u/profile"
              className="text-sm text-amber-500 font-semibold hover:text-rose-500"
            >
              Cancel Updating Profile Info
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
