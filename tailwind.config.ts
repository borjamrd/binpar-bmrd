import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        'bug': '#aedf78',
        'water': '#43ccff',
        'grass': '#00ca91',
        'fire': '#e95c4d',
        'normal': '#a5a5a5'
      }
    },
  },
  plugins: [],
} satisfies Config;
