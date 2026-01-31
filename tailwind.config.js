/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3C4895",
        "primary-dark": "#252d5c",
        "primary-light": "#4d5aa8",
        accent: "#F5D000",
        "accent-light": "#f7d933",
        stone: {
          50: "#fafaf9",
          100: "#f5f3f0",
          150: "#ebe8e5",
          200: "#e0dcd6",
          300: "#d0cac2",
          400: "#a39e96",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f3f0",
          200: "#e0dcd6",
          300: "#d0cac2",
          400: "#a39e96",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      fontSize: {
        "body-sm": ["0.9375rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "display-lg": [
          "clamp(2.5rem, 5vw + 1.5rem, 4rem)",
          { lineHeight: "1.12", letterSpacing: "0.01em" },
        ],
        display: [
          "clamp(2rem, 4vw + 1rem, 3.25rem)",
          { lineHeight: "1.2", letterSpacing: "0.01em" },
        ],
        headline: [
          "clamp(1.5rem, 2vw + 0.5rem, 2.25rem)",
          { lineHeight: "1.3" },
        ],
        title: ["1.25rem", { lineHeight: "1.35" }],
      },
      spacing: {
        section: "7rem",
        "section-lg": "10rem",
        content: "65ch",
      },
      maxWidth: {
        content: "65ch",
        wide: "80ch",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(0,0,0,0.04)",
        "card-hover": "0 2px 8px -2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
