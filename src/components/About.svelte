<script lang="ts">
	import { reveal } from '#lib/reveal.ts';

	const spec = [
		['Framework', 'SvelteKit 3 / Svelte 5'],
		['Language', 'TypeScript'],
		['Content', 'microCMS（ビルド時に取得）'],
		['Hosting', 'Vercel']
	];
</script>

<section class="section" id="about" data-alt="About">
	<div class="wrap">
		<div class="head reveal" use:reveal>
			<span class="head__num">01</span>
			<h2 class="head__title">About</h2>
			<p class="head__sub">このサイトについて</p>
		</div>
		<div class="about">
			<div>
				<p class="about__statement reveal" use:reveal>
					記事は <em>microCMS</em> で書き、<br />ページは <em>ビルド時</em> に作る。
				</p>
				<div class="about__text reveal" style:--d=".1s" use:reveal>
					<p>
						SvelteKit・TypeScript・microCMS で作った、ポートフォリオ兼ブログです。記事はビルド時に取得して静的な HTML として書き出すので、表示が速く、サーバーの負担もほとんどありません。
					</p>
					<p>同じ microCMS を Astro・Next.js・Nuxt でもサイトにしていて、フレームワークごとの違いを Blog にまとめています。</p>
				</div>
				<dl class="spec reveal" style:--d=".2s" use:reveal>
					{#each spec as [dt, dd]}
						<div><dt>{dt}</dt><dd>{dd}</dd></div>
					{/each}
				</dl>
			</div>
			<figure class="about__media reveal" style:--d=".15s" use:reveal>
				<div class="about__frame">
					<picture>
						<source srcset="/image/about.webp" type="image/webp" />
						<img
							src="/image/about.jpg"
							alt="デスクに置かれたノートPC・スマートフォン・コーヒー"
							width="800"
							height="533"
							loading="lazy"
						/>
					</picture>
				</div>
				<figcaption class="about__caption"><span>Built with SvelteKit</span><span>Tokyo, JP</span></figcaption>
			</figure>
		</div>
	</div>
</section>
