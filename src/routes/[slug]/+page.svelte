<script lang="ts">
	import HeaderInner from '../../components/HeaderInner.svelte';
	import Footer from '../../components/Footer.svelte';
	import Contact from '../../components/Contact.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title} | Svelte Base</title>
	<meta name="description" content={data.title} />
</svelte:head>

<HeaderInner />

<main>
	<article class="page section--light">
		<div class="container">
			<div class="article">
				<a href="/#blog" class="article__back">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
					Back to Blog
				</a>
				<div class="article__meta">
					{#if data.category}<span class="post__cat">{data.category.name}</span>{/if}
					<time class="post__date" datetime={data.publishedAt}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg
						>{dayjs(data.publishedAt).format('YYYY.MM.DD')}
					</time>
				</div>
				<h1 class="article__title">{data.title}</h1>
				{#if data.eyecatch}
					<div class="article__eyecatch">
						<img
							src="{data.eyecatch.url}?w=1600&fm=webp"
							alt=""
							width={data.eyecatch.width}
							height={data.eyecatch.height}
						/>
					</div>
				{/if}
				<div class="article__body">{@html data.content}</div>
			</div>
		</div>
	</article>
	<Contact />
</main>

<Footer />
