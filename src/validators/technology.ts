import { z } from "zod";

const technologySchema = z.object({
  name: z.string().min(2).nonempty({
    message: "Username is required.",
  }),
  icon: z.string().min(2).nonempty({
    message: "Icon is required.",
  }),
});

export default technologySchema;
