/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'cool-gray': '#E5E7EB',
        'electric-blue': '#3B82F6',
      },
    },
  },
  plugins: [],
}
