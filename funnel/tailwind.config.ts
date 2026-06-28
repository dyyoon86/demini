import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0B",
        surface: "#141416",
        inset: "#0F0F11",
        line: "#222225",
        line2: "#2B2B2F",
        line3: "#3A3A3F",
        fg: "#ECEAE6",
        fg2: "#C7C5C0",
        muted: "#8B8A86",
        subtle: "#69696A",
        faint: "#4D4D4C",
        accent: "#FF5C38",
        "accent-fg": "#FF8A6B",
        "accent-2": "#22D3EE",
        success: "#34C759",
        danger: "#FF453A",
        warning: "#FFB020",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Malgun Gothic",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
