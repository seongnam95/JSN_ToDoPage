import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { typoPlugin } from './src/styles/theme/typoPlugin';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    spacing: {
      px: '1px',
      '0': '0',
      '1.5': '0.6rem',
      ...Object.fromEntries(
        Array.from({ length: 50 }, (_, i) => [
          i + 1,
          `${((i + 1) * 4) / 10}rem`,
        ])
      ),
    },
    borderRadius: {
      xs: '0.2rem',
      sm: '0.4rem',
      md: '0.8rem',
      lg: '1.2rem',
      full: '9999px',
    },
    screens: {
      sm: '501px',
      md: '768px',
      lg: '1200px',
    },
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
      danger: {
        DEFAULT: 'var(--danger)',
        surface: 'var(--danger-surface)',
      },
      yellow: 'var(--yellow)',
    },
    fontFamily: {
      pretendard: ['var(--pretendard)', ...fontFamily.sans],
    },
  },
  plugins: [typoPlugin],
} satisfies Config;
