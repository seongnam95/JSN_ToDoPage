import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindAnimate from 'tailwindcss-animate';
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
    boxShadow: {
      sm: '0 4px 16px 0 rgba(170, 170, 170, 0.2)',
      md: '0 6px 32px 0 rgba(170, 170, 170, 0.2)',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      background: 'hsl(var(--background))',
      surface: {
        DEFAULT: 'hsl(var(--surface))',
        accent: 'hsl(var(--surface-accent))',
      },
      foreground: {
        DEFAULT: 'hsl(var(--foreground))',
        muted: 'hsl(var(--foreground-muted))',
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        surface: 'hsl(var(--primary-surface))',
      },
      border: {
        DEFAULT: 'hsl(var(--border))',
        accent: 'hsl(var(--border-accent))',
      },
      danger: {
        DEFAULT: 'hsl(var(--danger))',
        surface: 'hsl(var(--danger-surface))',
      },
      yellow: 'hsl(var(--yellow))',
      black: 'hsl(var(--black))',
    },
    fontFamily: {
      pretendard: ['var(--pretendard)', ...fontFamily.sans],
    },
  },
  plugins: [typoPlugin, tailwindAnimate],
} satisfies Config;
