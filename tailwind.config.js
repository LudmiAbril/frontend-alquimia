/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        hueso: "var(--hueso)",
        violeta: "var(--violeta)",
        lila: "var(--lila)",
        gris1: "var(--gris1)",
        gris2: "var(--gris2)",
        gris3: "var(--gris3)",
        gris4: "var(--gris4)",
      },
      fontFamily: {
        roboto: "var(--font-roboto)",
        principal: "var(--font-principal)",
      },
      backgroundImage: {
        degrade: "var(--degrade)",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease forwards",
        brillar: "brillar 1s ease-out infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        brillar: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
