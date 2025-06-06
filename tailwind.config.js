/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
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
        customA: '#156E86',
        customB: '#F56A80',
        customC: '#F8A301',
        customD: '#1F583B',
      },
      fontFamily: {
        roboto: "var(--font-roboto)",
        principal: "var(--font-principal)",
              volkorn: ['"Vollkorn"', 'serif'],
      },
      backgroundImage: {
        degrade: "var(--degrade)",
      },  perspective: {
  '2500px': '2500px',
},

      animation: {
        fadeIn: "fadeIn 0.6s ease forwards",
        brillar: "brillar 1s ease-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        shine: "shine 1.5s linear forwards",
        star: "twinkle 3s ease-in-out infinite, float 10s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        brillar: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(0.5)", opacity: "0" },
        },glow: {
      "0%": {
        boxShadow: "0 0 0px var(--violeta)",
      },
      "50%": {
        boxShadow: "0 0 18px 6px var(--violeta-claro)",
      },
      "100%": {
        boxShadow: "0 0 0px var(--violeta)",
      },
    },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.3)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
