/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          deep: "var(--color-teal-deep)",
          DEFAULT: "var(--color-teal)",
          light: "var(--color-teal-light)",
        },
        gold: {
          DEFAULT: "var(--color-gold)",
          dark: "var(--color-gold-dark)",
          light: "var(--color-gold-light)",
        },
        cream: "var(--color-cream)",
        peach: "var(--color-peach)",
        charcoal: "var(--color-charcoal)",
        ink: "var(--color-ink)",
        stone: "var(--color-stone)",
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      maxWidth: {
        wrap: "1220px",
      },
      boxShadow: {
        soft: "0 20px 44px -24px rgba(10,70,80,0.35)",
        card: "0 12px 28px -18px rgba(10,70,80,0.28)",
        lift: "0 24px 48px -20px rgba(10,70,80,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .7s cubic-bezier(.22,1,.36,1) both",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
