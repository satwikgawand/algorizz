/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        primary: '#00ff41',
        secondary: '#c084fc',
        accent: '#fbbf24',
        'text-main': '#ffffff',
        'surface': '#1a1a1a',
        'surface-2': '#242424',
        'border': '#333333',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
