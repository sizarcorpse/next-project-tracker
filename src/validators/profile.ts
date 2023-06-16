import { z } from "zod";

const linkedin =
  /^(https?:\/\/)?(www\.)?(linkedin\.com\/)?(in\/[a-z0-9_-]+\/?)?$/i;
const github =
  /^(https?:\/\/)?(www\.)?(github\.com\/)?[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/i;

const twitter =
  /^(https?:\/\/)?(www\.)?(twitter\.com\/)?(#!\/)?[a-zA-Z0-9_]+\/?$/i;

const facebook =
  /^(https?:\/\/)?(www\.)?(facebook\.com\/)?(#!\/)?[a-zA-Z0-9._]+\/?$/i;

const instagram =
  /^(https?:\/\/)?(www\.)?(instagram\.com\/)?(#!\/)?[a-zA-Z0-9_]+\/?$/i;

const website = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$/i;

export const ProfileValidator = z.object({
  designation: z
    .string()
    .max(50, {
      message: "Designation must be at most 50 characters long",
    })
    .optional(),
  company: z
    .string()
    .max(50, {
      message: "Company must be at most 50 characters long",
    })
    .optional(),
  website: z
    .string()
    .regex(website, {
      message: "Website must be a valid URL",
    })
    .optional(),
  location: z
    .string()
    .max(50, {
      message: "Location must be at most 50 characters long",
    })
    .optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  bio: z
    .string()
    .max(500, {
      message: "Bio must be at most 500 characters long",
    })
    .optional(),
  contact: z
    .string()
    .email({
      message: "Contact must be a valid email",
    })
    .optional(),
  linkedin: z
    .string()
    .regex(linkedin, {
      message: "Linkedin must be a valid URL",
    })
    .optional(),
  github: z
    .string()
    .regex(github, {
      message: "Github must be a valid URL",
    })
    .optional(),

  twitter: z
    .string()
    .regex(twitter, {
      message: "Twitter must be a valid URL",
    })
    .optional(),
  facebook: z
    .string()
    .regex(facebook, {
      message: "Facebook must be a valid URL",
    })
    .optional(),
  instagram: z
    .string()
    .regex(instagram, {
      message: "Instagram must be a valid URL",
    })
    .optional(),
});

export type ProfileUpdateRequest = z.infer<typeof ProfileValidator>;
