/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'signika': ['signika negative', 'overpass'],
        'overpass': ['overpass', 'signika negative'],
        'bree': ['bree serif', 'signika negative'],
      }
    },
  },
  plugins: [],
}