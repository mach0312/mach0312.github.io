// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
	site: 'https://mach0312.github.io',
	integrations: [mdx(), sitemap()],
	// 기술 요소별 글로 나누면서 내린 시스템 단위 글의 옛 주소를 이어 준다.
	redirects: {
		'/blog/amr-v2-software': '/blog/vda5050-v3-integration/',
		'/blog/battery-agv-control': '/blog/vda5050-v3-integration/',
		'/blog/agv-control-web': '/blog/robot-operation-hmi/',
		'/blog/incheon-fleet-simulator': '/blog/battery-swap-simulation/',
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
			// 따옴표나 하이픈을 자동으로 바꾸는 문장부호 치환은 쓰지 않는다.
			smartypants: false,
		}),
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark-dimmed' },
			defaultColor: false,
		},
	},
});
