/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '320px',
      'sm': '375px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Vintage color palette - Light and airy
        'vintage': {
          'cream': '#FBF8F3',
          'beige': '#F5EFE6',
          'tan': '#E8DCC4',
          'brown': '#C4A57B',
          'rust': '#D4A574',
          'olive': '#B8C5A8',
          'sage': '#D4E2D4',
          'slate': '#A8B5C0',
          'charcoal': '#6B6B6B',
          'ink': '#4A4A4A',
        },
        // Graphic Design Section - Vintage Artistic
        'creative': {
          'burnt-orange': '#CC5500',
          'terracotta': '#C65D3B',
          'mauve': '#915F6D',
          'dusty-rose': '#B67B7F',
          'ochre': '#CC7722',
        },
        // Academic Section - Vintage Technical
        'tech': {
          'prussian': '#003153',
          'slate-blue': '#6B8E9F',
          'steel': '#5F7C8A',
          'pewter': '#96A8B2',
          'graphite': '#404040',
        },
        // Personal Section - Warm Vintage
        'warm': {
          'sepia': '#9B7653',
          'amber': '#FFBF00',
          'honey': '#D4A574',
          'cream': '#FFF8DC',
          'rose': '#C98986',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'handwritten': ['Caveat', 'cursive'],
        'vintage': ['Courier New', 'monospace'],
        'body': ['Lato', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
      },
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-left': 'max(1rem, env(safe-area-inset-left))',
        'safe-right': 'max(1rem, env(safe-area-inset-right))',
      },
      minHeight: {
        'touch': '48px',
        'touch-lg': '56px',
      },
      minWidth: {
        'touch': '48px',
        'touch-lg': '56px',
      },
      animation: {
        'subtle-float': 'subtleFloat 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'vintage': '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
        'vintage-lg': '0 10px 20px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
