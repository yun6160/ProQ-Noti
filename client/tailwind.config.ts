import type { Config } from 'tailwindcss';

export default {
  content: [
    // Tailwind CSS가 적용될 파일 경로들
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // 사용자 정의 폰트 패밀리 설정
      fontFamily: {
        ganpan: ['KCC-Ganpan', 'sans-serif']
      },
      // 사용자 정의 폰트 굵기 설정
      fontWeight: {
        extraBold: '800',
        bold: '700',
        semiBold: '600',
        medium: '500',
        regular: '400',
        light: '300',
        extraLight: '200'
      },
      // 사용자 정의 색상 설정
      colors: {
        background: 'var(--background)', // CSS 변수 사용
        foreground: 'var(--foreground)', // CSS 변수 사용
        primary: {
          coral: '#E95F5C',
          mint: '#79CEB8',
          yellow: '#FFDB00',
          skyblue: '#5CC3E8',
          navy: '#314855',
          white: '#FFFFFF'
        }
      },
      // 사용자 정의 너비 설정
      width: {
        web: '46.875rem', // 750px
        mobile: '30rem', // 480px
        screen: '78.125rem' // 1250px
      },
      // 최소 너비 설정
      minWidth: {
        mobile: '21.875rem' // 350px
      },
      // 배경색 설정
      backgroundColor: {
        error: '#f5f5f5' // 에러 배경색
      },
      // 반응형 디자인을 위한 화면 크기 설정
      screens: {
        mobile: '480px',
        web: '750px',
        screen: '1250px',
        image: '530px'
      },
      // 그림자 설정
      boxShadow: {
        top: '0 0 8px rgba(0, 0, 0, 0.08)',
        bottom: '0 0 8px rgba(0, 0, 0, 0.08)'
      },
      // 폰트 크기 설정
      fontSize: {
        heading1: [
          '1.5rem', // 24px
          {
            lineHeight: '1.3',
            fontWeight: '700'
          }
        ],
        heading2: [
          '1.25rem', // 20px
          {
            lineHeight: '1.3',
            fontWeight: '700'
          }
        ],
        heading3: [
          '1.125rem', // 18px
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        body1: [
          '1rem', // 16px
          {
            lineHeight: '1.6',
            fontWeight: '500'
          }
        ],
        body2: [
          '.875rem', // 14px
          {
            lineHeight: '1.6',
            fontWeight: '500'
          }
        ],
        body1Bold: [
          '1rem', // 16px
          {
            lineHeight: '1.6',
            fontWeight: '700'
          }
        ],
        body2Bold: [
          '.875rem', // 14px
          {
            lineHeight: '1.6',
            fontWeight: '700'
          }
        ],
        button: [
          '1rem', // 16px
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        smallBtn: [
          '.875rem', // 14px
          {
            lineHeight: '1.4',
            fontWeight: '600'
          }
        ],
        caption: [
          '.75rem', // 12px
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
