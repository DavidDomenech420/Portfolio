/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Definimos la fuente de texto
        'pixel': ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
}