// tailwind-index.config.js
module.exports = {
  content: [
    './templates/index.html', // Update this path to the actual location of your index.html
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      BeVietnamPro: "'Be Vietnam Pro', sans-serif",
    },
    extend: {
      colors: {
        brightRed: '#f25f3a',
        brightRedLight: '#f6866a',
        brightRedSuperLight: '#fdece7',
        darkBlue: '#242d52',
        darkGrayishBlue: '#9095a7',
        veryDarkBlue: '#1d1e25',
        veryPaleRed: '#ffefeb',
        veryLightGray: '#fafafa',
      },
      dropShadow: {
        '4xl': '0 8px 5px rgb(242 95 58 / 0.35)',
      },
      height: {
        250: '250px',
        275: '275px',
      }
    }
  },
  plugins: [],
};