/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      'primary': "#D7D7D7",
      'secondary': "#171518",
      "tartiary": "#757575",
      "pink": "#EE9AE5"
    },   boxShadow: {
      '3xl': '0 10px 50px 0px rgba(0, 0, 0, 0.15)',
    }
  },
  },
  plugins: [],
}

