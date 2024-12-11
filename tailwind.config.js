module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          track: 'bg-gray-200 dark:bg-gray-700',
          thumb: 'bg-gray-400 dark:bg-gray-600',
          hover: 'bg-gray-500 dark:bg-gray-500',
        },
      },
      keyframes: {
        slide: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        slide: 'slide 1.5s forwards',
      },
      fontFamily: {
        'aeonik-bold': ['AeonikBold', 'sans-serif'],
      },
      colors: {
        '2F4454': '#2F4454',
        primary: '#077f7f',
        secondary: '#2f4454',
        hover: '#f0f6f9',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')({
      charts: true,
    }),
    // ... other plugins
  ],
};