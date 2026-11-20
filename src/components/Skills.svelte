<script lang="ts">
	import { reveal } from '#lib/reveal.ts';

	type Category = 'frontend' | 'backend' | 'tool';
	type Skill = {
		name: string;
		tag: string;
		cat: Category;
		desc: string;
		/** /static/image 以下の画像名（webp と jpg / png を用意） */
		img?: string;
		/** フォールバック画像の拡張子（既定は jpg） */
		ext?: 'jpg' | 'png';
		/** 白抜きロゴをブランド色の上に置く */
		logo?: boolean;
		/** 同じ microCMS をその技術でサイトにしたデモ */
		demo?: string;
		/** このサイト自身 */
		here?: boolean;
	};

	const skills: Skill[] = [
		{ name: 'Svelte', tag: 'Frontend', cat: 'frontend', here: true, desc: 'このサイト。SvelteKit 3 と Svelte 5 の Runes で作り、記事はビルド時に生成。' },
		{ name: 'Astro', img: 'astro', tag: 'Frontend', cat: 'frontend', demo: 'https://astrobase.vercel.app/', desc: 'コンテンツ中心のサイトを軽く作れる。記事は Content Layer で読み込み。' },
		{ name: 'Next.js', img: 'next', tag: 'Frontend', cat: 'frontend', demo: 'https://next-tech-trigger.vercel.app/', desc: 'App Router と Cache Components。Webhook で公開と同時に反映。' },
		{ name: 'Nuxt', img: 'nuxt', tag: 'Frontend', cat: 'frontend', demo: 'https://nuxtbase-gsap.vercel.app/', desc: 'Server API を挟み、microCMS の API キーをブラウザに出さない構成。' },
		{ name: 'JavaScript', img: 'js', tag: 'Frontend', cat: 'frontend', desc: 'フロントエンドの土台。DOM 操作から非同期処理まで日常的に使う。' },
		{ name: 'Python', img: 'py', tag: 'Backend', cat: 'backend', desc: 'Web API・データ処理・業務の自動化。FastAPI で AI を組み込んだ API も。' },
		{ name: 'Django', img: 'django', tag: 'Backend', cat: 'backend', desc: '認証や管理画面が揃った Python の Web フレームワーク。' },
		{ name: 'microCMS', img: 'microcms-icon-white', ext: 'png', logo: true, tag: 'CMS', cat: 'tool', desc: '日本発のヘッドレス CMS。API の設計から Webhook での再ビルドまで。' },
		{ name: 'Figma', img: 'figma', tag: 'Design', cat: 'tool', desc: 'UI デザインとプロトタイピング。デザインからコードへの橋渡しに。' }
	];

	const filters: { key: 'all' | Category; label: string }[] = [
		{ key: 'all', label: 'All' },
		{ key: 'frontend', label: 'Frontend' },
		{ key: 'backend', label: 'Backend' },
		{ key: 'tool', label: 'CMS / Design' }
	];
	let filter = $state<'all' | Category>('all');
</script>

<section class="section section--dark" id="skills" data-alt="Skills">
	<div class="wrap">
		<div class="head reveal" use:reveal>
			<span class="head__num">02</span>
			<h2 class="head__title">Skills</h2>
			<p class="head__sub">扱える技術と、それで作ったもの</p>
		</div>
		<div class="filters reveal" role="group" aria-label="カテゴリで絞り込む" use:reveal>
			{#each filters as f}
				<button class="chip" type="button" aria-pressed={filter === f.key} onclick={() => (filter = f.key)}
					>{f.label}</button
				>
			{/each}
		</div>
		<ul class="skills">
			{#each skills as s, i}
				<li
					class="skill reveal"
					class:is-dim={filter !== 'all' && s.cat !== filter}
					style:--d="{(i % 2) * 0.08}s"
					use:reveal
				>
					<div class="skill__icon" class:skill__icon--logo={s.logo}>
						{#if s.img}
							<picture>
								<source srcset="/image/{s.img}.webp" type="image/webp" />
								<img src="/image/{s.img}.{s.ext ?? 'jpg'}" alt="" width="64" height="64" loading="lazy" />
							</picture>
						{:else}
							<!-- Svelte のロゴ -->
							<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"
								><rect width="64" height="64" fill="#ff3e00" /><path
									fill="#fff"
									d="M43.6 15.9c-3.5-5-10.4-6.5-15.4-3.3l-8.8 5.6a10 10 0 0 0-4.6 6.8 10.6 10.6 0 0 0 1 6.8 10 10 0 0 0-1.5 3.8 10.7 10.7 0 0 0 1.8 8.1c3.5 5 10.4 6.5 15.4 3.3l8.8-5.6a10 10 0 0 0 4.6-6.8 10.6 10.6 0 0 0-1-6.8 10 10 0 0 0 1.5-3.8 10.7 10.7 0 0 0-1.8-8.1Zm-16.5 30a6.9 6.9 0 0 1-7.4-2.8 6.4 6.4 0 0 1-1.1-4.9l.2-.8.2-.5.4.3a10.6 10.6 0 0 0 3.3 1.6l.3.1v.3a1.9 1.9 0 0 0 .4 1.3 2.1 2.1 0 0 0 2.2.8 1.9 1.9 0 0 0 .5-.2l8.8-5.6a1.8 1.8 0 0 0 .8-1.2 1.9 1.9 0 0 0-.3-1.5 2.1 2.1 0 0 0-2.2-.8 1.9 1.9 0 0 0-.5.2l-3.4 2.1a6.5 6.5 0 0 1-1.8.8 6.9 6.9 0 0 1-7.4-2.8 6.4 6.4 0 0 1-1.1-4.9 6 6 0 0 1 2.7-4.1l8.8-5.6a6.4 6.4 0 0 1 1.8-.8 6.9 6.9 0 0 1 7.4 2.8 6.4 6.4 0 0 1 1.1 4.9l-.2.8-.2.5-.4-.3a10.6 10.6 0 0 0-3.3-1.6l-.3-.1v-.3a1.9 1.9 0 0 0-.4-1.3 2.1 2.1 0 0 0-2.2-.8 1.9 1.9 0 0 0-.5.2l-8.8 5.6a1.8 1.8 0 0 0-.8 1.2 1.9 1.9 0 0 0 .3 1.5 2.1 2.1 0 0 0 2.2.8 1.9 1.9 0 0 0 .5-.2l3.4-2.1a6.5 6.5 0 0 1 1.8-.8 6.9 6.9 0 0 1 7.4 2.8 6.4 6.4 0 0 1 1.1 4.9 6 6 0 0 1-2.7 4.1l-8.8 5.6a6.4 6.4 0 0 1-1.8.8Z"
								/></svg
							>
						{/if}
					</div>
					<div>
						<div class="skill__name"><h3>{s.name}</h3><span>{s.tag}</span></div>
						<p>{s.desc}</p>
					</div>
					{#if s.here}
						<span class="skill__here">このサイト</span>
					{:else if s.demo}
						<a class="skill__link" href={s.demo} target="_blank" rel="noopener noreferrer"
							>Demo
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
								><path d="M7 17 17 7M8 7h9v9" /></svg
							><span class="sr">（{s.name} のデモを新しいタブで開く）</span></a
						>
					{:else}
						<span></span>
					{/if}
				</li>
			{/each}
		</ul>
		<p class="skills__note reveal" use:reveal>リンクは、その技術で同じ microCMS をサイトにしたデモです。</p>
	</div>
</section>
