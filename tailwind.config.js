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
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delay': 'fadeIn 0.8s ease-out 0.3s forwards',
        'fade-in-delay-2': 'fadeIn 0.8s ease-out 0.6s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
