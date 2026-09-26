module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream:   'rgb(from var(--uds-surface-canvas) r g b / <alpha-value>)',
        paper:   'rgb(from var(--uds-surface-canvas) r g b / <alpha-value>)',
        surface: 'rgb(from var(--uds-surface-elevated) r g b / <alpha-value>)',
        ink:     'rgb(from var(--uds-color-text-primary) r g b / <alpha-value>)',
        line:    'rgb(from var(--uds-color-border-subtle) r g b / <alpha-value>)',
        soft:    'rgb(from var(--uds-color-text-secondary) r g b / <alpha-value>)',
        faint:   'rgb(from var(--uds-color-text-secondary) r g b / <alpha-value>)',
        accent:  'rgb(from var(--uds-color-action-primary) r g b / <alpha-value>)',
      },
      borderWidth: {
        DEFAULT: 'var(--uds-border-width-standard)',
        2: 'var(--uds-border-width-strong)',
      },
      fontFamily: {
        display: ['var(--uds-font-heading)', 'Impact', 'sans-serif'],
        sans: ['var(--uds-font-body)', 'monospace'],
        serif:  ['var(--font-serif)', 'Georgia', 'serif'],
        mono:   ['var(--uds-font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        soft: 'var(--uds-motion-easing-standard)',
      },
    },
  },
  plugins: [],
};
