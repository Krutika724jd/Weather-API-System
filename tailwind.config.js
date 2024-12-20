/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
     
    },
    extend: {
      screens: {
        '3xl': '3300px', // Adds a new `3xl:` screen variant
      }
    },
  },
  plugins: [],
}

