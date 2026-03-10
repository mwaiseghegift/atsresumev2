/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '8.5in': '8.5in',
      },
      minHeight: {
        '11.7in': '11.7in',
      },
    },
  },
  plugins: [],
}
