const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./pages/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Layouts/*.{js,ts,jsx,tsx}",
    "./CustomHooks/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {

    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            primary: "#48016D"
          },
        },
        dark: {
          // ...
          colors: {},
        },
    }
    })
  ],
}
