import plugin from "tailwindcss/plugin";
// #f8fafc slate-50   hsl(210, 40%, 98%)
// #f1f5f9 slate-100  hsl(210, 40%, 96%)
// #e2e8f0 slate-200  hsl(214, 32%, 91%)
// #1e293b slate-800  hsl(216, 32%, 17%)
// #0f172a slate-900  hsl(222, 47%, 11%)
// #020617 slate-950  hsl(222.2 84% 4.9%)
// #f3f4f6 gray-100   hsl(220, 14%, 96%)
// #e5e7eb gray-200   hsl(220, 13%, 91%)
// #e5e7eb gray-300   hsl(214.3 31.8% 91.4%)
// #374151 gray-700   hsl(217, 19%, 27%)
// #111827 gray-900   hsl(221, 39%, 11%)
// #e11d48 rose-600   hsl(0 84.2% 60.2%)
// #0891b2 teal-600   hsl(192, 91%, 36%)
// #1f2937 gray-800   hsl(217.2 32.6% 17.5%)

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "210, 40%, 98%",
        "--foreground": "216, 32%, 17%",

        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",

        "--popover": "220, 14%, 96%",
        "--popover-foreground": "216, 32%, 17%",

        "--card": "210, 40%, 96%",
        "--card-foreground": "216, 32%, 17%",

        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",

        "--primary": "222, 47%, 11%",
        "--primary-foreground": "214, 32%, 91%",

        "--secondary": "220, 13%, 91%",
        "--secondary-foreground": "216, 32%, 17%",

        "--accent": "220, 13%, 91%",
        "--accent-foreground": "216, 32%, 17%",

        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "214, 32%, 91%",

        "--ring": "192, 91%, 36%",
        "--radius": "0.5rem",
      },

      ".dark": {
        "--background": "222.2 84% 4.9%",
        "--foreground": "214, 32%, 91%",

        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "215 20.2% 65.1%",

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

        "--accent": "217.2 32.6% 17.5%",
        "--accent-foreground": "214, 32%, 91%",

        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "0 85.7% 97.3%",

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
          "2xl": "1400px",
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
