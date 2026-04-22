import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--t-bg)',
        panel: 'var(--t-panel)',
        border: 'var(--t-border)',
        ink: 'var(--t-ink)',
        muted: 'var(--t-muted)',
        accent: 'var(--t-accent)',
        accent2: 'var(--t-accent2)',
        ok: 'var(--t-ok)',
        warn: 'var(--t-warn)',
        err: 'var(--t-err)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-serif-source, "Source Serif 4")', 'Georgia', 'Cambria', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
