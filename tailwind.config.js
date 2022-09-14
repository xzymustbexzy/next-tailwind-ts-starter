module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  important: '#__next',
  theme: {
    // fontSize: {
    //   sm: ['0.875rem', '1.2rem'],
    //   base: ['1rem', '1.5rem'],
    // },
    ringColor: {
      DEFAULT: 'var(--color-brand-main)',
    },
    extend: {
      colors: {
        brand: 'var(--color-brand-main)',
        'brand-1': 'var(--color-brand-1)',
        'brand-2': 'var(--color-brand-2)',
        stress: 'var(--color-stress)',
        title: 'var(--color-title)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        disable: 'var(--color-disable)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        'bg-l1': 'var(--color-bg-primary)',
        'bg-l2': 'var(--color-bg-secondary)',
        'bg-l3': 'var(--color-bg-tertiary)',
        link: 'var(--color-link)',
        success: 'var(--color-success)',
        warn: 'var(--color-warn)',
        accent: 'var(--color-accent)',
        error: 'var(--color-error)',
      },
    },
  },
  plugins: [],
};
