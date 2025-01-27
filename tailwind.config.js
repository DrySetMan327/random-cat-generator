/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Google Fontsから参照するフォントを定義
      fontFamily: {
        logo: {
          Inter: ["var(--font-inter)"],
          Roboto: ["var(--font-roboto)"],
        },
      },
    },
  },
  plugins: [],
};

