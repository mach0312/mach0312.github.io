import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPICS } from './consts';

const blog = defineCollection({
	// src/content/blog/ 아래 .md, .mdx 파일 하나가 글 하나다. 파일 이름이 주소가 된다.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		topic: z.enum(TOPICS),
		tags: z.array(z.string()).default([]),
		// 연재물이면 같은 series 이름과 순서(seriesOrder)를 준다.
		series: z.string().optional(),
		seriesOrder: z.number().optional(),
		// true면 배포 사이트에서 빠진다. 로컬 개발 서버(npm run dev)에서는 보인다.
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
