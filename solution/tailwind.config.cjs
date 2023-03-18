/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "hsl(238, 40%, 52%)",
          "light-blue": "hsl(239, 57%, 85%)",
          "soft-red": "hsl(358, 79%, 66%)",
          "pale-red": "hsl(357, 100%, 86%)",
        },
        neutral: {
          50: "hsl(0, 0%, 100%)",
          100: "hsl(228, 33%, 97%)",
          200: "hsl(223, 19%, 93%)",
          300: "hsl(211, 10%, 45%)",
          400: "hsl(212, 24%, 26%)",
        },
      },
    },
    fontFamily: {
      sans: ["Rubik"],
    },
  },
  plugins: [],
};
