<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	const links = [
		{ id: 'about', label: 'About' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'blog', label: 'Blog' },
		{ id: 'contact', label: 'Contact' }
	];

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let activeId = $state('');

	const isHome = $derived(page.url.pathname === '/');
	const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

	const setMenu = (open: boolean) => {
		menuOpen = open;
		document.body.classList.toggle('is-locked', open);
	};

	$effect(() => {
		const onScroll = () => (scrolled = scrollY > 20);
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
		onScroll();
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('keydown', onKey);
		return () => {
			removeEventListener('scroll', onScroll);
			removeEventListener('keydown', onKey);
		};
	});

	// 現在のセクションをナビでハイライト(ページ遷移ごとに監視し直す)
	let navIO: IntersectionObserver | undefined;
	afterNavigate(() => {
		navIO?.disconnect();
		activeId = '';
		navIO = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) activeId = e.target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		document.querySelectorAll('main section[id]').forEach((s) => navIO!.observe(s));
	});
	$effect(() => () => navIO?.disconnect());
</script>

<header class="header" class:is-scrolled={scrolled}>
	<nav class="nav" aria-label="メイン">
		<div class="nav__group">
			{#each links.slice(0, 2) as l}
				<a
					href={href(l.id)}
					class="nav__link"
					class:is-active={activeId === l.id}
					aria-current={activeId === l.id ? 'true' : undefined}>{l.label}</a
				>
			{/each}
		</div>
		<a href={isHome ? '#top' : '/'} class="nav__logo">Svelte<b>.</b>Base</a>
		<div class="nav__group nav__group--right">
			<a
				href={href('blog')}
				class="nav__link"
				class:is-active={activeId === 'blog'}
				aria-current={activeId === 'blog' ? 'true' : undefined}>Blog</a
			>
			<a href={href('contact')} class="nav__link nav__link--cta">Contact</a>
		</div>
	</nav>
</header>

<button
	class="menu-btn"
	type="button"
	aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
	aria-expanded={menuOpen}
	aria-controls="sp-nav"
	onclick={() => setMenu(!menuOpen)}
>
	<span></span><span></span><span></span>
</button>
<div class="sp-nav" class:is-open={menuOpen} id="sp-nav" aria-hidden={!menuOpen}>
	<div class="sp-nav__circle"></div>
	<ul class="sp-nav__list">
		{#each links as l, i}
			<li>
				<a href={href(l.id)} tabindex={menuOpen ? 0 : -1} onclick={() => setMenu(false)}
					><small>0{i + 1}</small>{l.label}</a
				>
			</li>
		{/each}
	</ul>
</div>
