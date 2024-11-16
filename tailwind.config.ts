import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'big': '25rem',
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
        // Add as many as you need
      }
    }
  }
}