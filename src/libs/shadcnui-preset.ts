import type { Config } from "tailwindcss";
import * as tailwindcssAnimate from "tailwindcss-animate";
import { shadcnPlugin } from "./shadcnui-plugin";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [shadcnPlugin, tailwindcssAnimate],
} satisfies Config;
