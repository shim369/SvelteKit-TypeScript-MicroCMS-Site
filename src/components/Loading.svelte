<script module lang="ts">
	// ローディング演出は初回表示時のみ（クライアント遷移で戻ってきた時は出さない）
	let introPlayed = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '#lib/motion.ts';

	const title = [...'Svelte Base'];

	// 幕の下端を、少しずつずらした稜線にする（上がるときに山の形が見える）
	const ridgeY = [100, 92, 97, 84, 90, 78, 86, 95, 88, 96, 91, 98];
	const xs = [100, 88, 80, 72, 63, 55, 47, 38, 29, 20, 10, 0];
	const ridge = (offset: number) =>
		`polygon(0 0,100% 0,${xs.map((x, i) => `${x}% ${ridgeY[i] + offset}%`).join(',')})`;

	let show = $state(!introPlayed);
	let lifting = $state(false);
	let count = $state(0);
	let el = $state<HTMLDivElement>();

	onMount(() => {
		const body = document.body;
		const timers: ReturnType<typeof setTimeout>[] = [];
		let raf = 0;
		const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

		const done = () => {
			show = false;
			body.classList.remove('is-locked');
		};

		if (!show || prefersReducedMotion()) {
			introPlayed = true;
			body.classList.add('is-ready');
			done();
			return;
		}
		introPlayed = true;
		body.classList.add('is-locked');

		const t0 = performance.now();
		const tick = (t: number) => {
			const p = Math.min((t - t0) / 1300, 1);
			count = Math.round(p * 100);
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		// 1. 平らな下端 → 稜線の形へ  2. 稜線のまま上へ抜ける
		later(() => {
			if (!el) return done();
			el.style.transition = 'clip-path .45s var(--ease)';
			el.style.clipPath = ridge(-6);
			later(() => {
				if (!el) return done();
				lifting = true;
				el.style.transition = 'clip-path 1.1s var(--ease-io)';
				el.style.clipPath = ridge(-112);
				later(() => body.classList.add('is-ready'), 350);
				later(done, 1150);
			}, 460);
		}, 1450);

		return () => {
			timers.forEach(clearTimeout);
			cancelAnimationFrame(raf);
			body.classList.remove('is-locked');
		};
	});
</script>

{#if show}
	<div class="loading" class:is-lift={lifting} aria-hidden="true" bind:this={el}>
		<div class="loading__title">
			{#each title as c, i}
				<span style:animation-delay="{i * 0.05}s">{c === ' ' ? ' ' : c}</span>
			{/each}
		</div>
		<span class="loading__count">{String(count).padStart(3, '0')}</span>
	</div>
{/if}
