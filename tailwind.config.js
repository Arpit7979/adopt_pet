/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#E8B20E",
        gray:"#8F8e9d",
        white:"#fff",
        light_primary:'#FFF7D1'
      },
      fontFamily:{
        outfit:["outfit","sans-serif"],
        outfitM:["outfit-medium","sans-serif"],
        outfitB:["outfit-bold","sans-serif"],
      }
    },
  },
  plugins: [],
}

