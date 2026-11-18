<script module lang="ts">
	// ローディング演出は初回表示時のみ(クライアント遷移で戻ってきた時は出さない)
	let introPlayed = false;
</script>

<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import HeaderInner from '../components/HeaderInner.svelte';
	import Footer from '../components/Footer.svelte';
	import Contact from '../components/Contact.svelte';
	import { reveal } from '$lib/reveal';

	let { data }: { data: PageData } = $props();

	type Category = 'frontend' | 'backend' | 'tool';
	type Skill = {
		name: string;
		img: string;
		/** フォールバック画像の拡張子(既定は jpg) */
		ext?: 'jpg' | 'png';
		/** 白抜きロゴ用のアイコン背景色 */
		bg?: string;
		cat: Category;
		tag: string;
		lv: number;
		desc: string;
	};
	const skills: Skill[] = [
		{ name: 'Astro', img: 'astro', cat: 'frontend', tag: 'Frontend', lv: 70, desc: 'コンテンツ中心のサイトを軽量に作れる静的サイトジェネレーター。React との併用も可能。' },
		{ name: 'JavaScript', img: 'js', cat: 'frontend', tag: 'Frontend', lv: 90, desc: 'フロントエンド開発の土台となる言語。DOM 操作から非同期処理まで日常的に使用。' },
		{ name: 'Next.js', img: 'next', cat: 'frontend', tag: 'Frontend', lv: 80, desc: 'React ベースのフレームワーク。App Router と ISR で高速なサイトを構築。' },
		{ name: 'Nuxt.js', img: 'nuxt', cat: 'frontend', tag: 'Frontend', lv: 65, desc: 'Vue ベースのフレームワーク。Nuxt 3 と Server API で安全な構成を実現。' },
		{ name: 'Python', img: 'py', cat: 'backend', tag: 'Backend', lv: 85, desc: 'スクリプトやバックエンド開発で活用。データ処理や自動化にも便利。' },
		{ name: 'Django', img: 'django', cat: 'backend', tag: 'Backend', lv: 70, desc: '認証や管理画面が揃った Python の Web フレームワーク。堅牢な API 開発に。' },
		{ name: 'microCMS', img: 'microcms-icon-white', ext: 'png', bg: '#5650ce', cat: 'tool', tag: 'CMS', lv: 80, desc: '日本発のヘッドレス CMS。API 設計から記事配信まで各フレームワークと連携。' },
		{ name: 'Figma', img: 'figma', cat: 'tool', tag: 'Design', lv: 60, desc: 'UI デザインとプロトタイピングに使用。デザインからコードへの橋渡しに。' }
	];
	const filters: { key: 'all' | Category; label: string }[] = [
		{ key: 'all', label: 'All' },
		{ key: 'frontend', label: 'Frontend' },
		{ key: 'backend', label: 'Backend' },
		{ key: 'tool', label: 'CMS / Design' }
	];
	let filter = $state<'all' | Category>('all');

	const posts = $derived(data.contents.filter((c) => c.category?.name === 'Svelte').slice(0, 3));

	// アイキャッチが無い場合のプレースホルダー
	const placeholder = (hue: number, label: string) =>
		'data:image/svg+xml,' +
		encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},25%,38%)"/><stop offset="1" stop-color="hsl(${hue},20%,24%)"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><g stroke="rgba(255,255,255,.08)">${Array.from({ length: 10 }, (_, i) => `<path d="M${i * 64} 0V400M0 ${i * 64}H600"/>`).join('')}</g><circle cx="470" cy="110" r="70" fill="#e7c942" opacity=".9"/><text x="40" y="350" font-family="Arial" font-size="44" fill="#e2e8ea" opacity=".9">${label}</text></svg>`
		);

	const loadingTitle = [...'Svelte Base'];
	const stripItems = ['SvelteKit', 'TypeScript', 'microCMS', 'Jamstack', 'Vercel', 'Web development'];
	let showLoading = $state(!introPlayed);
	let loadingDone = $state(false);
	let loadingEl = $state<HTMLDivElement>();
	let moonEl: HTMLDivElement;
	let moonWrapEl: HTMLDivElement;
	let mountainEl: HTMLImageElement;

	onMount(() => {
		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const timers: ReturnType<typeof setTimeout>[] = [];
		const body = document.body;
		let finished = false;

		// ローディングの黄色い面を、月の位置・大きさまで円形に縮めて「月になる」演出
		const finishLoading = () => {
			if (finished) return;
			finished = true;
			introPlayed = true;
			const done = () => {
				if (loadingEl) loadingEl.style.transition = '';
				loadingDone = true; // 黄色の円をフェードアウト
				body.classList.add('is-moon'); // 同じ場所の本物の月をフェードイン
				body.classList.remove('is-locked');
			};
			body.classList.add('is-ready'); // 縮む円の外側でヒーローの文字が現れ始める
			if (!loadingEl || reduceMotion) return done();

			const r = moonEl.getBoundingClientRect();
			const cx = r.left + r.width / 2;
			const cy = r.top + r.height / 2;
			const far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
			loadingEl.classList.add('is-condensing');
			loadingEl.style.clipPath = `circle(${far}px at ${cx}px ${cy}px)`; // 画面全体を覆う円から
			loadingEl.getBoundingClientRect(); // 開始状態を確定
			loadingEl.style.transition = 'clip-path 1.6s cubic-bezier(.75,0,.2,1)';
			loadingEl.style.clipPath = `circle(${r.width / 2}px at ${cx}px ${cy}px)`; // 月と同じ円へ
			timers.push(setTimeout(done, 1650));
		};

		if (showLoading) body.classList.add('is-locked');
		if (!showLoading || reduceMotion) finishLoading();
		else {
			const start = () => timers.push(setTimeout(finishLoading, 1400));
			if (document.readyState === 'complete') start();
			else addEventListener('load', start, { once: true });
			timers.push(setTimeout(finishLoading, 4000)); // 画像読込が遅い場合の保険
		}

		// 奥行きのパララックス:山はゆっくり沈み、月はさらに昇る
		const onScroll = () => {
			const y = scrollY;
			if (!reduceMotion && y < innerHeight) {
				mountainEl.style.translate = `0 ${y * 0.18}px`;
				moonWrapEl.style.translate = `0 ${y * -0.22}px`;
			}
		};
		addEventListener('scroll', onScroll, { passive: true });

		return () => {
			timers.forEach(clearTimeout);
			removeEventListener('scroll', onScroll);
			body.classList.remove('is-locked');
		};
	});
</script>

<svelte:head>
	<title>Svelte Base</title>
	<meta name="description" content="Svelte × Jamstack" />
</svelte:head>

{#if showLoading}
	<div class="loading" class:is-done={loadingDone} aria-hidden="true" bind:this={loadingEl}>
		<div class="loading__title">
			{#each loadingTitle as c, i}
				<span style="animation-delay:{i * 0.05}s">{@html c === ' ' ? '&nbsp;' : c}</span>
			{/each}
		</div>
		<div class="loading__bar"></div>
	</div>
{/if}

<HeaderInner />

<section class="hero" id="top">
	<div class="scene" aria-hidden="true">
		<div class="scene__stage">
			<div class="scene__moonwrap" bind:this={moonWrapEl}>
				<div class="scene__orbit scene__orbit--outer"></div>
				<div class="scene__orbit"></div>
				<div class="scene__moon" bind:this={moonEl}></div>
			</div>
			<picture>
				<source srcset="/image/main-v.webp" type="image/webp" />
				<img
					class="scene__mountain"
					src="/image/main-v.jpg"
					alt=""
					width="2067"
					height="1044"
					fetchpriority="high"
					bind:this={mountainEl}
				/>
			</picture>
			<div class="scene__mist"></div>
		</div>
	</div>
	<a href="#about" class="hero__rail hero__rail--right intro" style="--d:1.2s">Scroll</a>
	<div class="hero__inner">
		<div class="hero__head">
			<p class="hero__eyebrow intro" style="--d:.35s">Svelte × Jamstack</p>
			<h1 class="hero__title">
				<span class="line"><span class="intro" style="--d:.5s">Web</span></span>
				<span class="line"><span class="intro" style="--d:.65s">development</span></span>
			</h1>
			<p class="hero__lead intro" style="--d:.85s">
				速く、軽く、更新しやすい。<wbr />Svelte と Jamstack でつくる Web サイト。
			</p>
		</div>
		<div class="hero__foot">
			<div class="hero__actions intro" style="--d:1s">
				<a href="#blog" class="btn btn--primary"
					>Read the Blog
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a
				>
			</div>
		</div>
	</div>
	<!-- ヒーローの締めくくり:流れる帯(同じリストを8回並べて途切れないようにする) -->
	<div class="hero__strip" aria-hidden="true">
		{#each Array(8) as _}
			<ul>
				{#each stripItems as item}<li>{item}</li>{/each}
			</ul>
		{/each}
	</div>
	<a href="#about" class="scrolldown intro" style="--d:1.2s" aria-label="下へスクロール">
		<span class="scrolldown__mouse"></span>scroll
	</a>
</section>

<main>
	<!-- About -->
	<section class="section section--light" id="about">
		<div class="container">
			<div class="section-head reveal" use:reveal>
				<span class="section-head__num">01</span>
				<h2 class="section-head__title">About</h2>
				<p class="section-head__sub">このサイトについて</p>
			</div>
			<div class="about">
				<div class="about__media reveal" data-reveal="left" use:reveal>
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
				<div class="about__card reveal" data-reveal="right" style="--d:.15s" use:reveal>
					<span class="about__label">PROFILE</span>
					<h3>About Svelte</h3>
					<p>
						SvelteKit・TypeScript・microCMS で構築した、ポートフォリオ兼ブログサイトです。microCMS の記事を静的生成で配信し、軽快な表示とスクロールアニメーションを実現しています。
					</p>
					<p>
						Astro・Next.js・Nuxt など複数のフレームワークで同じ構成を試し、その知見を Blog にまとめています。気になる記事があればぜひご覧ください。
					</p>
					<div class="about__stats">
						<div><strong data-count="10">0</strong><span>YEARS</span></div>
						<div><strong data-count={skills.length}>0</strong><span>SKILLS</span></div>
						<div><strong data-count="30" data-suffix="+">0</strong><span>WORKS</span></div>
					</div>
					<a href="https://github.com/shim369" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px"
							><path
								d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
							/></svg
						>
						GitHub
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills -->
	<section class="section section--dark" id="skills">
		<div class="container">
			<div class="section-head reveal" use:reveal>
				<span class="section-head__num">02</span>
				<h2 class="section-head__title">Skills</h2>
				<p class="section-head__sub">扱える技術</p>
			</div>
			<div class="skills__filters reveal" role="group" aria-label="カテゴリで絞り込み" use:reveal>
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
						class:is-hidden={filter !== 'all' && s.cat !== filter}
						style="--d:{(i % 4) * 0.08}s;--lv:{s.lv}%"
						use:reveal
					>
						<span class="skill__tag">{s.tag}</span>
						<div class="skill__icon" class:skill__icon--logo={s.bg} style:background={s.bg}>
							<picture>
								<source srcset="/image/{s.img}.webp" type="image/webp" />
								<img src="/image/{s.img}.{s.ext ?? 'jpg'}" alt="" width="100" height="100" loading="lazy" />
							</picture>
						</div>
						<h3>{s.name}</h3>
						<p>{s.desc}</p>
						<div
							class="skill__level"
							role="meter"
							aria-label="{s.name} の習熟度"
							aria-valuemin="0"
							aria-valuemax="100"
							aria-valuenow={s.lv}
						>
							<i></i>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Blog -->
	<section class="section section--light blog" id="blog">
		<div class="container">
			<div class="section-head reveal" use:reveal>
				<span class="section-head__num">03</span>
				<h2 class="section-head__title">Blog</h2>
				<p class="section-head__sub">最新の記事</p>
			</div>
			<div class="posts">
				{#each posts as p, i (p.id)}
					<a href="/{p.id}" class="post reveal" style="--d:{i * 0.1}s" use:reveal>
						<div class="post__thumb">
							<img
								src={p.eyecatch ? `${p.eyecatch.url}?w=800&fm=webp` : placeholder([190, 45, 200][i % 3], p.category.name)}
								alt=""
								width="600"
								height="400"
								loading="lazy"
							/>
						</div>
						<div class="post__body">
							<div class="post__meta">
								<span class="post__cat">{p.category.name}</span>
								<time class="post__date" datetime={p.publishedAt}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
										><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg
									>{dayjs(p.publishedAt).format('YYYY.MM.DD')}
								</time>
							</div>
							<h3 class="post__title">{p.title}</h3>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<span class="blog__watermark" aria-hidden="true">What's New</span>
	</section>

	<Contact />
</main>

<Footer />
