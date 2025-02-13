# ProQ-Noti

#### 로컬 시작 명령어
`yarn dev`

## 프로젝트 구조

```plaintext
client/
├── .github/         # 템플릿 보관 
├── .next/           # Next.js 빌드 결과물 (배포 시 사용)
├── node_modules/    # 설치된 npm/yarn 패키지
├── public/          # 정적 파일 (이미지, 폰트, 아이콘 등) 저장
│   ├── favicon.ico
│   ├── logo.png
│   └── fonts/       
├── src/             
│   ├── app/         # App Router 폴더
│   │   ├── layout.tsx  
│   │   ├── page.tsx    
│   │   ├── newPage/      
│   │   │   ├── page.tsx
│   │   ├── api/        # 서버리스 API Route
│   ├── components/     # 컴포넌트 폴더
│   ├── hooks/          # 커스텀 훅 폴더
│   ├── lib/            # API, 유틸 함수 폴더
│   ├── styles/         # 전역 CSS, Tailwind 설정 폴더
│   ├── stores/         # 상태 관리 폴더
├── .prettierrc        # Prettier 설정
├── .eslintrc.js       # ESLint 설정
├── .gitignore         # Git 무시 파일 목록
├── next.config.mjs    # Next.js 설정 파일
├── package.json       # 프로젝트 메타 정보 및 의존성 목록
├── tsconfig.json      # TypeScript 설정 파일
└── yarn.lock          # 패키지 관리용 Lock 파일
