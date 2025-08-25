/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#158b4b',
          light: '#1ea854',
          glow: '#22c55e',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#334155'
        },
        accent: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          foreground: '#334155'
        },
        background: '#ffffff',
        foreground: '#334155',
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b'
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        lister: {
          gold: '#f59e0b',
          green: '#158b4b',
          blue: '#3b82f6'
        },
        social: {
          like: '#ef4444',
          online: '#22c55e',
          notification: '#ef4444'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}