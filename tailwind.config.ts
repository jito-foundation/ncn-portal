import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/nextra-theme-docs/**/*.js",
    "./node_modules/nextra/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("postcss-import"), require("@tailwindcss/typography")],
  important: true,
};
export default config;
