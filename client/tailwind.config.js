const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const primary = "#0065f2";
const black = "#363a40";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: colors.white,
        transparent: colors.transparent,
        primary: primary,
        black: black,
        gray: {
          100: "#fcfcfc",
          300: "#efefef",
          500: "#c0c0c0",
          700: "#b9b9b9",
          900: "#67758d",
        },
        slate: {
          300: "#d9e0ec",
          500: "#67758d",
          700: "#363a40"
        }
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
      },
      keyframes: {
        fade: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        scaleIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        fade: "fade .5s ease-in-out",
        scaleIn: "scaleIn .35s ease-in-out",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme, addUtilities }) => {
      addComponents({
        ".btn-primary": {
          display: "inline-flex",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: primary,
          color: colors.white,
          borderRadius: "16px",
          transition: "background-color .3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#005ad9",
          },
        },
        ".btn-ghost": {
          display: "inline-flex",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: colors.transparent,
          color: primary,
          border: `2px solid ${primary}`,
          borderRadius: "16px",
          transition: "background-color .3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: primary,
            color: colors.white,
          }
        },
        ".h1": {
          margin: 0,
          color: black,
          fontSize: "48px",
          fontWeight: 700,
          lineHeight: 1
        },
        ".h2": {
          margin: 0,
          color: black,
          fontSize: "40px",
          fontWeight: 700,
          lineHeight: 1
        },
        ".h3": {
          margin: 0,
          color: black,
          fontSize: "32px",
          fontWeight: 500,
          lineHeight: 1
        }
      });
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px rgba(0, 0, 0, 0.4)"
        },
        ".outline-border-none": {
          outline: "none",
          border: "none"
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        ".image-like-bg": {
          objectPosition: "center",
          objectFit: "cover",
          pointerEvents: "none",
        }
      })
    }),
  ],
};
