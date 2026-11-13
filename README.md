# portfolio

김진우의 업무 자동화 개발자 포트폴리오입니다.

## 다른 컴퓨터에서 시작하기

Git과 Node.js 24를 준비한 뒤 최신 작업 브랜치를 받습니다.

```sh
git clone --branch work/portfolio-update-20261113 https://github.com/K-im-jinwoo/portfolio.git
cd portfolio/site
npm ci
npm run dev
```

터미널에 표시되는 Local 주소를 엽니다. Windows와 Mac/Linux 모두 같은 명령을 사용합니다. `node_modules`와 빌드·개발 서버 캐시는 컴퓨터마다 새로 생성하며 복사하지 않습니다.

기존 폴더에 미커밋 작업이 있으면 별도 폴더로 복제해 기존 작업을 보존합니다. 이 작업 브랜치를 이미 받은 폴더에서는 작업 시작 전에 `git pull --ff-only`로 동기화합니다.

## 수정할 위치

- 자기소개·기술: `site/content/profile.ts`
- 프로젝트 내용·분류·대표 사례: `site/content/projects.ts`
- 메인 화면: `site/app/page.tsx`
- 프로젝트 상세 화면: `site/app/projects/[slug]/page.tsx`

기존 소개 → 대표 사례 → 추가 경험 → 상세 설명 구조를 유지합니다. 현재 대표 사례는 학사·QMS·Excel 자동화·개인 WIKI이며, 업무·개인·산학 프로젝트를 구분해 표시합니다. 최근 AI 활용 작업에서는 사용자의 요구사항·샘플 전달 및 실행 결과 확인과 AI의 코드·테스트 구현을 구분합니다.

## 검사

`site` 폴더에서 실행합니다.

```sh
npm test
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

브라우저 검사까지 실행하려면 `npx playwright install chromium` 후 `npm run verify`를 실행합니다. Linux에서 시스템 라이브러리가 필요하면 `npx playwright install --with-deps chromium`을 사용합니다.

2026-11-13 작업본에서 단위 테스트 40개·타입 검사·빌드를 통과했습니다. 최종 수정 화면의 데스크톱·모바일 수동 점검은 남아 있습니다. Git 동기화와 공개 사이트 배포는 별개입니다.

## 개인 자료

이력서 PDF·편집 원본·개인 검토 기록은 `.career-work/`에 별도로 보관하며 공개 Git에 포함하지 않습니다. 환경 파일과 인증정보도 동기화 대상에서 제외합니다.
