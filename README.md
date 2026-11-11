# mach0312.github.io

손재락의 블로그와 작업 기록. [Astro](https://astro.build)로 만든 정적 사이트이며 https://mach0312.github.io 에 배포된다.

## 브라우저에서 글 쓰고 고치기

https://mach0312.github.io/admin/ 에서 글, 프로젝트, 소개 페이지를 쓰고 고친다. 저장하면 `main`에 바로 커밋되고 2~3분 뒤 사이트에 반영된다.

처음 한 번만 로그인 토큰을 만든다.

1. `/admin/`에서 **Sign In with Token**을 누르고, 안내 링크로 GitHub 토큰 만들기 화면을 연다.
2. Repository access를 **Only select repositories → mach0312/mach0312.github.io**로 고른다. 권한은 Contents: Read and write 하나면 된다.
3. 만든 토큰을 붙여 넣는다. 토큰은 그 브라우저에만 저장된다. 공용 PC에서는 다 쓰고 오른쪽 위 계정 메뉴에서 로그아웃한다.

- 본문은 마크다운 원문으로 편집한다(수식과 코드가 그대로 남는다). 편집기 위쪽에서 서식 편집으로 바꿀 수 있다.
- 비공개를 켜면 사이트에 올라가지 않는다.
- 편집 화면 설정은 `public/admin/config.yml`이다.

## 파일로 글 쓰기

`src/content/blog/` 아래에 마크다운 파일을 하나 만들면 글 하나가 된다. 파일 이름이 주소가 된다(`my-post.md` → `/blog/my-post/`).

```markdown
---
title: 글 제목
description: 목록과 검색 결과에 보일 한두 문장 요약
pubDate: '2026-11-10T10:00:00+09:00'
topic: Research        # Research | Engineering | Note | Retrospect
tags: [ros2, nav2]
series: 연재 이름       # 선택. 같은 이름끼리 연재 목록이 붙는다
seriesOrder: 1         # 선택. 연재 안에서의 순서
draft: true            # 선택. true면 배포 사이트에서 빠진다
---

본문. `##`, `###` 제목은 오른쪽 목차에 자동으로 들어간다.
수식은 $a_x$, $$ y = m a + b $$ 처럼 쓴다.
```

이미지는 글 파일 옆에 두고 `![설명](./figure.png)`로 넣는다.

## 고칠 곳

- 이름, 소개 문구, 연락처, 메뉴: `src/consts.ts`
- 소개 문구, 논문: `src/data/profile.json` (형식 검사는 `src/data/profile.ts`)
- 프로젝트 목록: `src/data/projects.json`
- 색과 글꼴: `src/styles/global.css` 맨 위 변수

## 로컬에서 보기

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
```

## 배포

`main`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해서 GitHub Pages에 올린다. PR에서는 빌드만 확인한다.
