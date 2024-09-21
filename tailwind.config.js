/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '2F4454': '#2F4454',
      },
      fontFamily: {
        custom: ['"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}