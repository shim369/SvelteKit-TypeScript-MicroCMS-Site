export const prefersReducedMotion = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/** smoothstep */
export const smooth = (v: number) => v * v * (3 - 2 * v);

/** スクロールイベントを requestAnimationFrame で間引く */
export const onScrollFrame = (update: () => void) => {
	let ticking = false;
	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			update();
			ticking = false;
		});
	};
	update();
	addEventListener('scroll', onScroll, { passive: true });
	addEventListener('resize', onScroll);
	return () => {
		removeEventListener('scroll', onScroll);
		removeEventListener('resize', onScroll);
	};
};
