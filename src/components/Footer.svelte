<script lang="ts">
	import { page } from '$app/state';

	let showTop = $state(false);
	let progress = $state(0);

	const base = $derived(page.url.pathname === '/' ? '' : '/');
	const year = new Date().getFullYear();

	$effect(() => {
		let ticking = false;
		const update = () => {
			const y = scrollY;
			const max = document.documentElement.scrollHeight - innerHeight;
			showTop = y > innerHeight * 0.8;
			progress = max > 0 ? y / max : 0;
			ticking = false;
		};
		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(update);
				ticking = true;
			}
		};
		update();
		addEventListener('scroll', onScroll, { passive: true });
		return () => removeEventListener('scroll', onScroll);
	});

	const toTop = () => {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
	};
</script>

<div class="progress" aria-hidden="true" style:transform="scaleX({progress})"></div>

<footer class="footer">
	<div class="container">
		<div class="footer__inner">
			<a href={base ? '/' : '#top'} class="footer__logo">Svelte<b>.</b>Base</a>
			<nav class="footer__nav" aria-label="フッター">
				<a href="{base}#about">About</a><a href="{base}#skills">Skills</a><a href="{base}#blog">Blog</a
				><a href="{base}#contact">Contact</a>
				<a href="https://github.com/shim369" target="_blank" rel="noopener noreferrer">GitHub</a>
			</nav>
		</div>
		<small>&copy; {year} Svelte Base</small>
	</div>
</footer>

<button class="to-top" class:is-show={showTop} type="button" aria-label="ページ上部へ戻る" onclick={toTop}>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
</button>
