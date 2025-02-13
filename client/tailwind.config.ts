import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard, sans-serif']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      width: {
        web: '46.875rem'
      },
      minWidth: {
        mobile: '21.875rem'
      },
      backgroundColor: {
        error: '#f5f5f5'
      },
      screens: {
        mobile: '375px',
        web: '750px',
        image: '530px'
      },
      boxShadow: {
        top: '0 0 8px rgba(0, 0, 0, 0.08)',
        bottom: '0 0 8px rgba(0, 0, 0, 0.08)'
      },
      fontSize: {
        heading1: [
          '1.5rem',
          {
            lineHeight: '1.3',
            fontWeight: '700'
          }
        ],
        heading2: [
          '1.25rem',
          {
            lineHeight: '1.3',
            fontWeight: '700'
          }
        ],
        heading3: [
          '1.125rem',
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        body1: [
          '1rem',
          {
            lineHeight: '1.6',
            fontWeight: '500'
          }
        ],
        body2: [
          '.875rem',
          {
            lineHeight: '1.6',
            fontWeight: '500'
          }
        ],
        body1Bold: [
          '1rem',
          {
            lineHeight: '1.6',
            fontWeight: '700'
          }
        ],
        body2Bold: [
          '.875rem',
          {
            lineHeight: '1.6',
            fontWeight: '700'
          }
        ],
        button: [
          '1rem',
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        smallBtn: [
          '.875rem',
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        caption: [
          '.75rem',
          {
            lineHeight: '1.4',
            fontWeight: '500'
          }
        ]
      }
    }
  },
  plugins: []
} satisfies Config;
