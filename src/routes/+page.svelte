<script lang="ts">
	import type { PageData } from './$types';
	import Loading from '../components/Loading.svelte';
	import HeaderInner from '../components/HeaderInner.svelte';
	import Altimeter from '../components/Altimeter.svelte';
	import Hero from '../components/Hero.svelte';
	import About from '../components/About.svelte';
	import Skills from '../components/Skills.svelte';
	import Blog from '../components/Blog.svelte';
	import Contact from '../components/Contact.svelte';
	import Footer from '../components/Footer.svelte';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.contents.filter((c) => c.category?.name === 'Svelte').slice(0, 3));
</script>

<svelte:head>
	<title>Svelte Base — Web development</title>
	<meta name="description" content="SvelteKit・TypeScript・microCMS で作った、速く、軽く、更新しやすい Web サイト。" />
</svelte:head>

<Loading />
<HeaderInner />
<Altimeter />

<Hero latest={posts[0]} />

<main>
	<About />
	<Skills />
	<Blog {posts} />
	<Contact />
</main>

<Footer />
