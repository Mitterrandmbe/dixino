/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#65B32C',
        'primaryLight': '#ddf3ce',
        'primaryDark': '#498320',
        'secondary': '#234798',
        'secondaryLight': '#acbfec',
        'secondaryDark': '#132653',
        'black': '#1A1F21',
        'grey': '#C6CFD2',
        'greyDark': '#A4B2B7',
        'warning': '#EB5757',
        'yellow': '#FBD85D',
      },
    },
  },
  plugins: [],
}
