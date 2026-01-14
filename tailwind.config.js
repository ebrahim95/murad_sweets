/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft pastels
        pastel: {
          pink: '#FFD6E0',
          peach: '#FFECD2',
          mint: '#C1E1C1',
          lavender: '#E6E6FA',
          cream: '#FFFDD0',
          blue: '#B5D8EB',
        },
        // Bold accent colors
        accent: {
          coral: '#FF6B6B',
          gold: '#FFD93D',
          teal: '#4ECDC4',
          magenta: '#FF69B4',
          orange: '#FF8C42',
        },
        // Brand colors
        brand: {
          primary: '#FF6B6B',
          secondary: '#FFD6E0',
          dark: '#2D3436',
          light: '#FFECD2',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
