/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        blackM: "#151515",
        reddM: "#A91D3A",
        redM: "#C73659",
        whiteM: "#EEEEEE",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
