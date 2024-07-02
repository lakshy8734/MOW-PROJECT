module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      fontSize: {
        '10em': '10em',
      },
      colors: {
        white: {
          A700_7f: "#ffffff7f",
          A700_6c: "#fcfefe6c",
          A700_a2: "#fcfefea2",
          A700: "#fcfefe",
        },
        indigo: {
          900: "#1f2b6c",
          "900_6c": "#1f2b6c6c",
          "900_a2": "#1f2b6ca2",
          "900_90": "#1f2b6c90",
          A200: "#5269e8",
          "900_63": "#1f2b6c63",
        },
        blue: { 100: "#bed2f7", 500: "#159eec" },
        gray: {
          50: "#fafdfe",
          300: "#e5e4e8",
          900: "#202124",
          "200_00": "#ebeaef00",
        },
        black: { 900: "#000000", "900_0c": "#0000000c" },
      },
      fontFamily: { worksans: "Work Sans", yesevaone: "Yeseva One" },
      boxShadow: { bs: "0px 0px  20px 0px #0000000c" },
      backgroundImage: {
        gradient: "linear-gradient(259deg ,#e5e4e8,#ebeaef00)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
