/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7f9fb",
        surface: "#ffffff",
        primary: "#004ac6",
        primaryDeep: "#00174b",
        primarySoft: "#dbe1ff",
        secondary: "#006686",
        skySoft: "#c0e8ff",
        ink: "#191c1e",
        muted: "#5f6472",
        outline: "#d7dbe7",
        success: "#0f8a5f",
        warning: "#f59e0b",
        danger: "#ba1a1a"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        glow: "0 24px 70px rgba(0, 74, 198, 0.18)"
      }
    }
  },
  plugins: []
};
