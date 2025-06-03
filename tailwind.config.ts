import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        xfinity: ["var(--font-xfinity-brown)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
