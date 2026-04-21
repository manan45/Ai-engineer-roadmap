import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0b',
        panel: '#101014',
        border: '#1f1f26',
        ink: '#e8e8ea',
        muted: '#8b8b94',
        accent: '#7c9cff',
        accent2: '#b48cff',
        ok: '#4ade80',
        warn: '#fbbf24',
        err: '#f87171',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
