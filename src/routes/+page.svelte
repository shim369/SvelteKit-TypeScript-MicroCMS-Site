<script lang="ts">
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import type { PageData } from "./$types";
	import dayjs from "dayjs";
	import { onMount, beforeUpdate } from 'svelte';
	import { gsap, TweenMax, Expo } from "gsap";
	import HeaderInner from '../components/HeaderInner.svelte';
	import Footer from '../components/Footer.svelte';
	import Contact from '../components/Contact.svelte';


	export let data: PageData;
	let openButton: HTMLElement;
	let loadingElement: HTMLDivElement;
	let loading: boolean;

	onMount(async () => {
		AOS.init();

		gsap.to('.loading', {
			delay: 1.6,
			display: "none",
			opacity: 0,
			onComplete: () => { loading = false; return; }
		})


		TweenMax.from('nav', .3, {
			delay: 1.9,
			opacity: 0,
			y: 20,
		})

		TweenMax.from('.open', .3, {
			delay: 2.2,
			zIndex: 0,
			opacity: 0,
		})

		TweenMax.from('.sub-read', .3, {
			delay: 2.5,
			opacity: 0,
			x: -20,
			ease: Expo.easeInOut,
		})

		TweenMax.from('.main-read', .3, {
			delay: 2.8,
			opacity: 0,
			x: -20,
			ease: Expo.easeInOut,
		})

		TweenMax.from('.scrolldown', .3, {
			delay: 3.1,
			opacity: 0,
			y: -20,
			ease: Expo.easeInOut,
		})

		// gsap.to(".moon", {
		// 	delay: 3.4,
		// 	duration: .3,
		// 	scale: 1,
		// 	ease: "power2.inOut"
		// })

		// TweenMax.from('.moon-text', .3, {
		// 	delay: 3.7,
		// 	opacity: 0,
		// 	x: 20,
		// 	display: "none",
		// 	ease: Expo.easeInOut,
		// })

	});

	const skillsArray = [
		{name: 'Astro', imageWebp: '/image/astro.webp', imageJpg: '/image/astro.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'JavaScript', imageWebp: '/image/js.webp', imageJpg: '/image/js.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Next.js', imageWebp: '/image/next.webp', imageJpg: '/image/next.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Nuxt.js', imageWebp: '/image/nuxt.webp', imageJpg: '/image/nuxt.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Python', imageWebp: '/image/py.webp', imageJpg: '/image/py.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Django', imageWebp: '/image/django.webp', imageJpg: '/image/django.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Newt', imageWebp: '/image/newt.webp', imageJpg: '/image/newt.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{name: 'Figma', imageWebp: '/image/figma.webp', imageJpg: '/image/figma.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
	];

	beforeUpdate(() => {
		AOS.refresh();
	});

	const sveltePosts = data.contents.filter(content => content.category.name === "Svelte");

	const latestSveltePosts = sveltePosts.slice(0, 3);
</script>
<svelte:head>
	<title>Svelte Base</title>
	<meta name="description" content="Svelte × Jamstack" />
</svelte:head>
<div class="loading" bind:this={loadingElement}><span class="opening-title">Svelte <br class="sp">Base</span></div>
<header>
	<!-- <div class="moon"><a class="moon-text" href="#a01">About <br class="sp">Svelte</a></div> -->
	<HeaderInner {openButton} />
	<div class="main-box">
		<span class="main-read">Web development</span>
		<div class="sub-read">Svelte × Jamstack</div>
		<div class="scrolldown"><span>scroll</span></div>
	</div>
</header>
<main>
<section id="a01">
	<div class="container">
		<h1>About</h1>
		<div class="flex-box">
			<div class="about-image" data-aos="fade-right">
				<picture>
					<source srcset="/image/about.webp" type="image/webp">
					<img src="/image/about.jpg" alt="about" width="800" height="533">
				</picture>
			</div>
			<div class="about-text" data-aos="fade-down">
				<h2>About Svelte</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maiores tenetur itaque saepe vero, nemo voluptatum hic vitae delectus. </p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maiores tenetur itaque saepe vero, nemo voluptatum hic vitae delectus. </p>
				<a href="https://github.com/shim369" target="_blank" rel="noopener noreferrer">GitHub</a>
			</div>
		</div>
	</div>
</section>
<section id="a02">
	<div class="container">
	<h1>Skills</h1>
	<ul class="skills-detail">
		{#each skillsArray as skill, i}
		<li data-aos="fade-up" data-aos-delay={i * 100}>
			<div class="skills-img">
				<picture>
					<source srcset={skill.imageWebp} type="image/webp">
					<img alt={skill.name} width="100" height="100" src={skill.imageJpg}>
				</picture>
			</div>
			<div class="skills-text">
				<h2>{skill.name}</h2>
				<p>{skill.description}</p>
			</div>
		</li>
		{/each}
	</ul>
	
	</div>
</section>
<section id="a03" class="blog">
	<div class="container">
	<h1>Blog</h1>
	<div class="blog-content" data-aos="fade-up">
		{#each latestSveltePosts as content, i}
		<a href="{content.id}" class="blog-item" data-aos="fade-up" data-aos-delay={i * 100}>
			<div class="blog-img">
				<img src={content.eyecatch?.url} alt="" width="400" height="266">
			</div>
			<div class="blog-text">
				<div class="blog-line1">
					<div class="category">{content.category.name}</div><div class="date"><span class="material-icons schedule-icon">schedule</span>{dayjs(content.publishedAt).format('YYYY.MM.DD')}</div>
				</div>
				<h2 class="title">{content.title}</h2>
			</div>
		</a>
		{/each}
	</div>
	</div>
</section>
<Contact />
</main>
<Footer />