
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './static/css/homepage/**/*.{html,js,jsx,ts,tsx,css}',
    './static/css/dashboard/**/*.{html,js,jsx,ts,tsx,css}',
    './templates/**/*.{html,js,jsx,ts,tsx}'
  ],
  darkMode: 'class', // Included dark mode setting
  theme: {
    extend: {},
  },
  plugins: [],
}