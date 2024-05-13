/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: [""],
      },
      colors: {
        backgroundColor: "#212121",
        YSESBlue: {
          0: "#E4F8FF",
          25: "#64CBFF",
          50: "#2AA1DB",
          75: "#294FB2",
          100: "#112C72",
        },
        YSESBlack: "#212121",
        YSESGray: "#D4D4D8",
      },
    },
    plugins: [],
  },
};
