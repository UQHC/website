/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'cursive']
      },
      colors: {
        'uqhc-orange': '#ff6427',
        'footmaroon': '#660000',
      },
      aspectRatio: {
        '9/10': '9 / 10',
      },
    },
  },
  plugins: []
};
