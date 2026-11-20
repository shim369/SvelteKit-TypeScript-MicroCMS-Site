<script lang="ts">
	import type { Blog } from '#lib/microcms.ts';
	import { formatDate } from '#lib/format.ts';
	import { reveal } from '#lib/reveal.ts';

	let { posts }: { posts: Blog[] } = $props();

	// アイキャッチが無い場合のプレースホルダー
	const placeholder = (hue: number, label: string) =>
		'data:image/svg+xml,' +
		encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},18%,38%)"/><stop offset="1" stop-color="hsl(${hue},20%,22%)"/></linearGradient></defs><rect width="960" height="600" fill="url(#g)"/><circle cx="760" cy="170" r="90" fill="#e7c942" opacity=".9"/><path d="M0 600 240 330l120 110 180-220 200 230 220-120v270Z" fill="rgba(226,232,234,.12)"/><text x="56" y="540" font-family="Arial" font-size="56" fill="#e2e8ea" opacity=".9">${label}</text></svg>`
		);
</script>

<section class="section blog" id="blog" data-alt="Blog">
	<div class="wrap">
		<div class="head reveal" use:reveal>
			<span class="head__num">03</span>
			<h2 class="head__title">Blog</h2>
			<p class="head__sub">Svelte の記事</p>
		</div>
		{#if posts.length}
			<div class="posts">
				{#each posts as p, i (p.id)}
					<a class="post reveal" href="/{p.id}" style:--d="{i * 0.1}s" use:reveal>
						<div class="post__thumb">
							<img
								src={p.eyecatch
									? `${p.eyecatch.url}?w=${i === 0 ? 1200 : 640}&fm=webp`
									: placeholder([190, 45, 200][i % 3], p.category?.name ?? 'Blog')}
								alt=""
								width="960"
								height="600"
								loading="lazy"
							/>
						</div>
						<div class="post__body">
							<div class="post__meta">
								{#if p.category}<span class="post__cat">{p.category.name}</span>{/if}
								<time datetime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
							</div>
							<h3 class="post__title">{p.title}</h3>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="blog__empty">記事はまだありません。</p>
		{/if}
	</div>
	<span class="blog__mark" aria-hidden="true">What's New</span>
</section>
