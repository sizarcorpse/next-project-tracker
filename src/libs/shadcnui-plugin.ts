import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "220, 16%, 22%",
        "--foreground": "219, 28%, 88%",

        "--muted": "222, 16%, 28%",
        "--muted-foreground": "218, 27%, 92%",

        "--popover": "220, 17%, 32%",
        "--popover-foreground": "218, 27%, 94%",

        "--border": "220, 16%, 36%",
        "--input": "219, 28%, 80%",

        "--card": "219, 28%, 88%",
        "--card-foreground": "220, 16%, 22%",

        "--primary": "240, 50%, 40%",
        "--primary-foreground": "219, 28%, 88%",

        "--secondary": "240, 25%, 80%",
        "--secondary-foreground": "220, 16%, 22%",

        "--accent": "48, 100%, 49%",
        "--accent-foreground": "220, 16%, 22%",

        "--destructive": "348, 100%, 59%",
        "--destructive-foreground": "220, 16%, 22%",

        "--success": "120, 100%, 49%",
        "--success-foreground": "219, 28%, 88%",

        "--warning": "60, 100%, 59%",
        "--warning-foreground": "220, 16%, 22%",

        "--ring": "240, 50%, 50%",

        "--radius": "0.5rem",
      },

      ".dark": {
        "--background": "222.2 84% 4.9%",
        "--foreground": "214, 32%, 91%",

        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "214, 32%, 91%",

        "--popover": "221, 39%, 11%",
        "--popover-foreground": "214, 32%, 91%",

        "--card": "222, 47%, 11%",
        "--card-foreground": "214, 32%, 91%",

        "--border": "216, 32%, 17%",
        "--input": "217, 19%, 27%",

        "--primary": "214, 32%, 91%",
        "--primary-foreground": "222.2 47.4% 11.2%",

        "--secondary": "217.2 32.6% 17.5%",
        "--secondary-foreground": "214, 32%, 91%",

        "--accent": "48, 100%, 49%",
        "--accent-foreground": "220, 16%, 22%",

        "--destructive": "348, 100%, 59%",
        "--destructive-foreground": "220, 16%, 22%",

        "--success": "120, 100%, 49%",
        "--success-foreground": "219, 28%, 88%",

        "--warning": "60, 100%, 59%",
        "--warning-foreground": "220, 16%, 22%",

        "--ring": "217.2 32.6% 17.5%",
      },
    });

    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1536px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            foreground: "hsl(var(--warning-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  }
);
