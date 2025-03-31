import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    // Tailwind CSS가 적용될 파일 경로들
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        ganpan: ['KCC-Ganpan', 'sans-serif']
      },
      fontWeight: {
        extraBold: '800',
        bold: '700',
        semiBold: '600',
        medium: '500',
        regular: '400',
        light: '300',
        extraLight: '200'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          coral: '#E95F5C',
          mint: '#79CEB8',
          yellow: '#FFDB00',
          skyblue: '#5CC3E8',
          navy: '#314855',
          white: '#FFFFFF',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      width: {
        web: '46.875rem',
        mobile: '30rem',
        screen: '78.125rem'
      },
      minWidth: {
        mobile: '21.875rem'
      },
      backgroundColor: {
        error: '#f5f5f5'
      },
      keyframes: {
        'slide-in-down': {
          '0%': {
            transform: 'translateY(-10%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        liked: {
          '50%': {
            transform: 'scale(1.15)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        slideindown: 'slide-in-down 0.5s ease-in-out forwards',
        like: 'liked 1s ease-in-out'
      },
      screens: {
        mobile: '480px',
        web: '750px',
        screen: '1250px',
        image: '530px'
      },
      boxShadow: {
        bottom: '0px 4px 4px rgba(0, 0, 0, 0.1)'
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
