/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E74C3C',
        'black-13': 'rgba(0, 0, 0, 0.13)',
        'black-20': 'rgba(0, 0, 0, 0.20)',
        'black-50': 'rgba(0, 0, 0, 0.50)',
        'black-90': 'rgba(0, 0, 0, 0.90)'
      },
    },
  },
  plugins: [],
}

