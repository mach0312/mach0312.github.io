// 소개 페이지와 프로젝트 페이지의 데이터를 읽는다.
// 내용은 profile.json, projects.json에 있고 글쓰기 화면(/admin/)에서 고친다.
// 여기서는 형식만 검사한다. 형식이 틀리면 빌드가 멈추고, 배포된 사이트는 그대로 남는다.
import { z } from 'astro/zod';
import profileJson from './profile.json';
import projectsJson from './projects.json';

const link = z.object({ label: z.string(), href: z.string() });

const publication = z.object({
	year: z.number(),
	kind: z.enum(['Journal', 'Conference']),
	title: z.string(),
	titleEn: z.string().optional(),
	authors: z.array(z.string()),
	venue: z.string(),
	status: z.string().optional(),
	links: z.array(link).default([]),
});

const profile = z.object({
	eyebrow: z.string(),
	lead: z.string(),
	intro: z.string(),
	facts: z.array(z.object({ label: z.string(), value: z.string() })),
	publications: z.array(publication),
	projectsIntro: z.string(),
	projectsNote: z.string(),
});

// state: 완료(done), 진행 중(active), 멈춤(stopped). 상태 표시의 색을 정한다.
const project = z.object({
	group: z.string(),
	name: z.string(),
	period: z.string().optional(),
	status: z.string(),
	state: z.enum(['done', 'active', 'stopped']),
	desc: z.string(),
	stack: z.array(z.string()).default([]),
	links: z.array(link).default([]),
	privateNote: z.string().optional(),
	// 적용처. 예) 피트인 2세대 AMR
	appliedTo: z.string().optional(),
	// 관련 글의 주소 이름(src/content/blog/<이름>.md)
	post: z.string().optional(),
});

export type Publication = z.infer<typeof publication>;
export type Project = z.infer<typeof project>;

export const PROFILE = profile.parse(profileJson);
export const FACTS = PROFILE.facts;
export const PUBLICATIONS = PROFILE.publications;

// 본인 이름은 논문 저자 목록에서 굵게 표시된다.
export const SELF_NAMES = ['손재락', 'J.-R. Son'];

export const PROJECTS = z.array(project).parse(projectsJson);

// 묶음은 이 순서로 보인다. 여기 없는 묶음은 맨 뒤에 붙는다. 묶음 안에서는 projects.json 순서를 따른다.
const GROUP_ORDER = [
	'구동·모션 제어',
	'관제·편대',
	'안전·신뢰성',
	'센서·위치 추정',
	'운용 도구',
	'현장 장비 자동화',
	'연구',
	'강의',
];

export function projectGroups(): { title: string; items: Project[] }[] {
	const titles = [...new Set([...GROUP_ORDER, ...PROJECTS.map((p) => p.group)])];
	return titles
		.map((title) => ({ title, items: PROJECTS.filter((p) => p.group === title) }))
		.filter((g) => g.items.length > 0);
}
