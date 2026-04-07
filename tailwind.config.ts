import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
          dark: "var(--color-bg-dark)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        accent: {
          blue: "var(--color-accent-blue)",
          "blue-light": "var(--color-accent-blue-light)",
          green: "var(--color-accent-green)",
          red: "var(--color-accent-red)",
          amber: "var(--color-accent-amber)",
        },
        border: {
          light: "var(--color-border-light)",
          dark: "var(--color-border-dark)",
        },
      },
      fontSize: {
        display: ["42px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["30px", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        h3: ["22px", { lineHeight: "1.3" }],
        body: ["17px", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "body-bold": ["17px", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        data: ["15px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        caption: ["13px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        nav: ["15px", { lineHeight: "1", letterSpacing: "0.04em" }],
        button: ["14px", { lineHeight: "1", letterSpacing: "0.05em" }],
      },
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      spacing: {
        gutter: "24px",
        "gutter-mobile": "16px",
      },
      borderRadius: {
        none: "2px",
      },
      maxWidth: {
        article: "720px",
        page: "1200px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
