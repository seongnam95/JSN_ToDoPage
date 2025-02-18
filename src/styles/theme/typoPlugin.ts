import * as plugin from 'tailwindcss/plugin';

export const typoPlugin = plugin.withOptions(() => {
  return ({ addUtilities }) => {
    addUtilities({
      // Title
      '.typo-title-14': {
        fontSize: '14px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '600',
      },
      '.typo-title-16': {
        fontSize: '16px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '600',
      },
      '.typo-title-18': {
        fontSize: '18px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '600',
      },
      '.typo-title-20': {
        fontSize: '20px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '600',
      },
      '.typo-title-32': {
        fontSize: '32px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '600',
      },

      // Body,
      '.typo-body-14': {
        fontSize: '14px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '500',
      },
      '.typo-body-16': {
        fontSize: '16px',
        lineHeight: '1.4',
        letterSpacing: '-0.015rem',
        fontWeight: '500',
      },
    });
  };
});
