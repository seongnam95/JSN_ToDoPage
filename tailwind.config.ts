import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      background: 'var(--background)',
      surface: {
        DEFAULT: 'var(--surface)',
        accent: 'var(--surface-accent)',
      },
      foreground: {
        DEFAULT: 'var(--foreground)',
        muted: 'var(--foreground-muted)',
      },
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
        surface: 'var(--primary-surface)',
      },
      border: {
        DEFAULT: 'var(--border)',
        accent: 'var(--border-accent)',
      },
    },
    fontFamily: {
      pretendard: ['var(--pretendard)', ...fontFamily.sans],
    },
  },
  plugins: [],
} satisfies Config;
