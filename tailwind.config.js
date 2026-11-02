/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'cursive']
      },
      colors: {
        'uqhc-orange': 'rgb(var(--uqhc-orange) / <alpha-value>)',
        'footmaroon': '#660000'
      },
      aspectRatio: {
        '9/10': '9 / 10'
      }
    }
  },
  plugins: []
};
