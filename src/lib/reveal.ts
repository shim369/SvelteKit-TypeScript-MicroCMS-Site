import type { Action } from 'svelte/action';

/**
 * 画面内に入ったら .is-in を付与する。
 * 要素側には class="reveal" を付けておくこと。
 */
export const reveal: Action<HTMLElement> = (node) => {
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				e.target.classList.add('is-in');
				io.unobserve(e.target);
			}
		},
		{ threshold: 0, rootMargin: '0px 0px -12% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
