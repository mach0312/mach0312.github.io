// 사이트 전역 정보. 이름, 소개, 연락처, 메뉴는 여기만 고치면 모든 페이지에 반영된다.

export const SITE_TITLE = '손재락';
export const SITE_TITLE_EN = 'Jaerak Son';
export const SITE_DESCRIPTION =
	'이동로봇의 모션 플래닝과 제어를 다루는 로보틱스 엔지니어 손재락의 블로그와 작업 기록.';

export const AUTHOR = {
	name: '손재락',
	nameEn: 'Jaerak Son',
	email: 'jr@pitin-ev.com',
	github: 'https://github.com/mach0312',
	orcid: 'https://orcid.org/0009-0009-8065-9318',
};

export const NAV = [
	{ href: '/', label: 'About' },
	{ href: '/blog/', label: 'Blog' },
	{ href: '/projects/', label: 'Projects' },
];

// 블로그 토픽. 글 frontmatter의 topic 값은 이 중 하나여야 한다.
export const TOPICS = ['Research', 'Engineering', 'Note', 'Retrospect'] as const;
export type Topic = (typeof TOPICS)[number];
