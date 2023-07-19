import * as z from "zod";

const technologySchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string().min(3, "Name should be at least 3 characters"),
  description: z.string().optional(),
  type: z.string().optional(),
  priority: z.string().optional(),
  visibility: z.string().optional(),
  stage: z.string().optional(),
  endDate: z.date().nullable().or(z.string().nullable()),
  figmaLink: z.string().url().or(z.string().nullable()),
  githubLink: z.string().url().or(z.string().nullable()),
  devLink: z.string().url().or(z.string().nullable()),
  liveLink: z.string().url().or(z.string().nullable()),
  technologies: z.array(technologySchema).optional(),
});

export default projectSchema;
