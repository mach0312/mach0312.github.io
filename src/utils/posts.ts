import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** 공개 대상 글을 최신순으로 돌려준다. 배포 빌드에서는 draft를 뺀다. */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 본문 분량으로 읽는 시간(분)을 어림한다. 한글 기준 분당 약 500자, 코드와 수식 블록은 뺀다. */
export function readingMinutes(body: string | undefined): number {
	if (!body) return 1;
	const text = body
		.replace(/```[\s\S]*?```/g, '')
		.replace(/\$\$[\s\S]*?\$\$/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/[#>*_`[\]()!|-]/g, '')
		.replace(/\s+/g, '');
	return Math.max(1, Math.round(text.length / 500));
}

export function postUrl(post: Post): string {
	return `/blog/${post.id}/`;
}

export function topicSlug(topic: string): string {
	return topic.toLowerCase();
}

export function tagSlug(tag: string): string {
	return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

/** 2026.11.10 또는 11.10 형태. 빌드 머신 시간대와 무관하게 frontmatter 날짜 그대로 쓴다. */
export function formatDate(date: Date, withYear = true): string {
	const y = date.getUTCFullYear();
	const m = String(date.getUTCMonth() + 1).padStart(2, '0');
	const d = String(date.getUTCDate()).padStart(2, '0');
	return withYear ? `${y}.${m}.${d}` : `${m}.${d}`;
}
