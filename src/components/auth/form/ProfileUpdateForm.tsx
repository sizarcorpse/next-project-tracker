"use client";
import { Listbox } from "@headlessui/react";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IconType } from "react-icons/lib";
import {
  RiArrowDownSLine,
  RiContactsLine,
  RiHotelLine,
  RiInformationLine,
  RiUserVoiceLine,
} from "react-icons/ri";

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

const FormSectionTitle = ({
  children,
  icon,
  subtitle,
}: {
  children: React.ReactNode;
  icon?: IconType;
  subtitle?: string;
}) => {
  const Icon = icon || RiInformationLine;
  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon className="text-slate-600" />
        <h4 className="text-sm font-semibold text-slate-600">{children}</h4>
      </div>
      {subtitle && (
        <span className="text-xs font-normal text-slate-500">{subtitle}</span>
      )}
    </div>
  );
};

const InputFieldStyles = (errors: any, field: any) => {
  return `w-full p-4 bg-slate-200 border rounded-md outline-none text-sm text-slate-800 font-normal disabled:opacity-70 disabled:cursor-not-allowed placeholder:font-normal placeholder:text-slate-400 ${
    errors[field]?.message ? "border-rose-700" : "border-transparent"
  }`;
};

const ProfileUpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(GENDER_DATA[0]);

  const router = useRouter();

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
      contact: "",
    },
    mode: "onBlur",
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const onError = (error: FieldErrors<FieldValues>) => {};

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="flex flex-col gap-4">
          {/* Company Information */}
          <div className="_company_ flex flex-col gap-3">
            <FormSectionTitle icon={RiHotelLine}>
              Company Information
            </FormSectionTitle>
            <div className="w-full">
              <div className="relative">
                <input
                  id="designation"
                  disabled={isLoading}
                  {...register("designation")}
                  placeholder="Designation"
                  type="text"
                  className={InputFieldStyles(errors, "designation")}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="relative">
                <input
                  id="company"
                  disabled={isLoading}
                  {...register("company")}
                  placeholder="Company Name"
                  type="text"
                  className={InputFieldStyles(errors, "company")}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="_company_ flex flex-col gap-3">
            <FormSectionTitle
              icon={RiContactsLine}
              subtitle="This will publicly show your email address on your profile."
            >
              Contact Information
            </FormSectionTitle>

            <div className="w-full">
              <div className="location">
                <input
                  id="location"
                  disabled={isLoading}
                  {...register("location")}
                  placeholder="Location Name"
                  type="text"
                  className={InputFieldStyles(errors, "location")}
                />
              </div>
            </div>

            <div className="w-full">
              <div className="relative">
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
                  className={InputFieldStyles(errors, "contact")}
                />
              </div>
              {errors.contact?.message && (
                <div className="text-rose-700 text-xs mt-3 pl-4">
                  {errors.contact?.message as string}
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="relative">
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
                  className={InputFieldStyles(errors, "website")}
                />
              </div>
              {errors.website?.message && (
                <div className="text-rose-700 text-xs mt-3 pl-4">
                  {errors.website?.message as string}
                </div>
              )}
            </div>

            {/* About  */}

            <div className="_company_ flex flex-col gap-3">
              <FormSectionTitle icon={RiHotelLine}>
                About Yourself
              </FormSectionTitle>
              <div className="w-full">
                <Listbox
                  value={selectedGender}
                  onChange={(e) => {
                    setValue("gender", e.value);
                    setSelectedGender(e);
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="w-full p-4 text-start bg-slate-200 border rounded-md outline-none text-sm text-slate-400 font-normal">
                      <span className="block truncate">
                        {selectedGender.title}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <RiArrowDownSLine
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg sm:text-sm">
                      {GENDER_DATA.map((gender) => (
                        <Listbox.Option
                          key={gender.id}
                          value={gender}
                          className={({ active }) =>
                            `relative cursor-default select-none px-4 py-2 ${
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
              </div>
            </div>
            {/* Button */}
            <div className="w-full">
              <button
                type="submit"
                title="Signup Button"
                className="w-full py-4 px-8 text-center duration-500 bg-[length:200%_auto] text-light rounded-md font-semibold shadow-md bg-gradient-to-r from-red-500 via-amber-500 to-red-500 cursor-pointer select-none touch-manipulation hover:bg-right-top focus-rose disabled:bg-gradient-to-r disabled:from-zinc-500 disabled:via-slate-500 disabled:to-zinc-500 disabled:cursor-not-allowed disabled:touch-manipulation disabled:hover:bg-right-top"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
