module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream:   'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink:     'rgb(var(--ink) / <alpha-value>)',
        soft:    'rgb(var(--soft) / <alpha-value>)',
        faint:   'rgb(var(--faint) / <alpha-value>)',
        accent:  'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans:   ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif:  ['var(--font-serif)', 'Georgia', 'serif'],
        mono:   ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        soft: 'var(--ease-soft)',
      },
    },
  },
  plugins: [],
};
