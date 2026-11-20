<script lang="ts">
	import { onMount } from 'svelte';
	import type { Blog } from '#lib/microcms.ts';
	import { formatDate } from '#lib/format.ts';
	import { clamp01, onScrollFrame, prefersReducedMotion, smooth } from '#lib/motion.ts';

	let { latest }: { latest?: Blog } = $props();

	const stack = ['SvelteKit 3', 'Svelte 5', 'TypeScript', 'microCMS'];

	let hero: HTMLElement;
	let mountain: HTMLImageElement;
	let copy: HTMLDivElement;
	let fog: HTMLDivElement;
	let ln1: HTMLSpanElement;
	let ln2: HTMLSpanElement;

	// 山に寄り、文字が左右に割れ、下から雲が湧いて About につながる
	onMount(() => {
		if (prefersReducedMotion()) return;
		return onScrollFrame(() => {
			const p = clamp01(scrollY / (hero.offsetHeight - innerHeight));
			const e = smooth(p);
			mountain.style.transform = `scale(${1 + e * 1.1})`;
			ln1.style.transform = `translateX(${-e * 34}vw)`;
			ln2.style.transform = `translateX(${e * 28}vw)`;
			copy.style.opacity = String(1 - clamp01((p - 0.3) / 0.45));
			const f = smooth(clamp01((p - 0.55) / 0.45));
			fog.style.opacity = String(f);
			fog.style.setProperty('--fog', `${(f * 100).toFixed(1)}%`);
		});
	});
</script>

<section class="hero" id="top" bind:this={hero}>
	<div class="hero__stage">
		<div class="scene" aria-hidden="true">
			<picture>
				<source srcset="/image/main-v.webp" type="image/webp" />
				<img
					class="scene__mountain"
					src="/image/main-v.jpg"
					alt=""
					width="2067"
					height="1044"
					fetchpriority="high"
					bind:this={mountain}
				/>
			</picture>
			<div class="mist"></div>
			<div class="mist mist--2"></div>
		</div>

		<div class="wrap hero__copy" bind:this={copy}>
			<p class="hero__eyebrow intro" style:--d=".2s">Svelte × Jamstack</p>
			<h1 class="hero__title" aria-label="Web development">
				<span class="ln ln--1" aria-hidden="true" bind:this={ln1}
					><span class="intro" style:--d=".25s">Web</span></span
				>
				<span class="ln ln--2" aria-hidden="true" bind:this={ln2}
					><span class="intro" style:--d=".38s">development</span></span
				>
			</h1>
			<div class="hero__side intro" style:--d=".7s">
				<p class="hero__lead">速く、軽く、更新しやすい。<br />SvelteKit と microCMS でつくる Web サイト。</p>
				<div class="hero__actions">
					<a href="#blog" class="btn btn--moon"
						>Read the Blog
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
							><path d="M5 12h14M13 6l6 6-6 6" /></svg
						></a
					>
					<a href="#contact" class="btn btn--line">Contact</a>
				</div>
			</div>
		</div>

		<!-- ベースキャンプの案内板 -->
		<div class="basecamp">
			<div class="wrap basecamp__in">
				<div class="basecamp__cell">
					<span class="basecamp__label">Latest</span>
					{#if latest}
						<a class="basecamp__latest" href="/{latest.id}">
							<span>{latest.title}</span>
							<time datetime={latest.publishedAt}>{formatDate(latest.publishedAt)}</time>
						</a>
					{:else}
						<a class="basecamp__latest" href="#blog"><span>Blog</span></a>
					{/if}
				</div>
				<div class="basecamp__cell basecamp__cell--stack">
					<span class="basecamp__label">Built with</span>
					<ul class="basecamp__stack">
						{#each stack as s}<li>{s}</li>{/each}
					</ul>
				</div>
				<div class="basecamp__cell">
					<a class="basecamp__scroll" href="#about"><i></i>Scroll<span class="sr">して About へ</span></a>
				</div>
			</div>
		</div>
		<div class="hero__fog" aria-hidden="true" bind:this={fog}></div>
	</div>
</section>
