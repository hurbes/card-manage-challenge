/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      extend: {
        fontSize: {
          dynamic: "var(--font-size-dynamic)",
        },
        boxShadow: {
          card: "0 5px 20px rgba(0, 0, 0, 0.15)",
        },
        letterSpacing: {
          1: "0em",
          2: "0.025em",
          3: "0.05em",
          4: "0.1em",
          5: "0.25em",
          widest: ".25em",
        },
      },
    },
  },
  plugins: [],
};
