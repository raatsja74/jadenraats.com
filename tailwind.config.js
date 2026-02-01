module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: 'rgb(var(--bg-primary) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--bg-surface) / <alpha-value>)',
          muted: 'rgb(var(--bg-surface-muted) / <alpha-value>)',
          glass: 'var(--bg-surface-glass)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          glow: 'var(--primary-glow)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          glow: 'var(--secondary-glow)',
        },
        main: 'rgb(var(--text-main) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        dim: 'rgb(var(--text-dim) / <alpha-value>)',
        border: {
          subtle: 'var(--border-subtle)',
          active: 'var(--border-active)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px -5px rgba(255, 95, 31, 0.3)',
        'glow-cyan': '0 0 20px -5px rgba(0, 210, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #FF5F1F 0%, #00D2FF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
      },
    },
  },
  plugins: [],
};

