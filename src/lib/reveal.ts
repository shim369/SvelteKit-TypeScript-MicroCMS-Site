import type { Action } from 'svelte/action';

const reduceMotion = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** [data-count] 要素を 0 から目標値までカウントアップする */
const countUp = (el: HTMLElement) => {
	const end = Number(el.dataset.count);
	const suffix = el.dataset.suffix ?? '';
	if (reduceMotion()) {
		el.textContent = end + suffix;
		return;
	}
	const t0 = performance.now();
	const dur = 1200;
	const step = (t: number) => {
		const p = Math.min((t - t0) / dur, 1);
		el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
		if (p < 1) requestAnimationFrame(step);
	};
	requestAnimationFrame(step);
};

/**
 * 画面内に入ったら .is-in を付与する(AOS の代替)。
 * 要素側には class="reveal" を付けておくこと。
 */
export const reveal: Action<HTMLElement> = (node) => {
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				const el = e.target as HTMLElement;
				el.classList.add('is-in');
				el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
				io.unobserve(el);
			}
		},
		{ threshold: 0.15 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
