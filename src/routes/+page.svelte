<script lang="ts">
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import type { PageData } from "./$types";
    import dayjs from "dayjs";
    import { onMount, beforeUpdate } from 'svelte';
    import { gsap, TweenMax, Expo } from "gsap";
    import HeaderInner from '../components/HeaderInner.svelte';;
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

        gsap.to(".moon", {
            delay: 3.4,
            duration: .3,
            scale: 1,
            ease: "power2.inOut"
        })

        TweenMax.from('.moon-text', .3, {
            delay: 3.7,
            opacity: 0,
            x: 20,
            display: "none",
            ease: Expo.easeInOut,
        })
    
    });

    beforeUpdate(() => {
        AOS.refresh();
    });
</script>
<svelte:head>
    <title>Svelte Base</title>
    <meta name="description" content="Svelte × Jamstack" />
</svelte:head>
<div class="loading" bind:this={loadingElement}><span class="opening-title">Svelte <br class="sp">Base</span></div>
<header>
    <div class="moon"><a class="moon-text" href="#a01">About <br class="sp">Svelte</a></div>
    <HeaderInner {openButton} />
    <div class="main-box">
        <span class="main-read">Web<br>development</span>
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
                    <img src="/image/about.webp" alt="" width="800" height="533">
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
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Astro" width="100" height="100" src="/image/astro.webp">
                </div>
                <div class="skills-text">
                    <h2>Astro</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="JavaScript" width="100" height="100" src="/image/js.webp">
                </div>
                <div class="skills-text">
                    <h2>JavaScript</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Next.js" width="100" height="100" src="/image/next.webp">
                </div>
                <div class="skills-text">
                    <h2>Next.js</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Nuxt.js" width="100" height="100" src="/image/nuxt.webp">
                </div>
                <div class="skills-text">
                    <h2>Nuxt.js</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Python" width="100" height="100" src="/image/py.webp">
                </div>
                <div class="skills-text">
                    <h2>Python</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Django" width="100" height="100" src="/image/django.webp">
                </div>
                <div class="skills-text">
                    <h2>Django</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Newt" width="100" height="100" src="/image/newt.webp">
                </div>
                <div class="skills-text">
                    <h2>Newt</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
            <li data-aos="fade-up">
                <div class="skills-img">
                    <img alt="Figma" width="100" height="100" src="/image/figma.webp">
                </div>
                <div class="skills-text">
                    <h2>Figma</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </li>
        </ul>
        </div>
    </section>
    <section id="a03" class="blog">
        <div class="container">
        <h1>Blog</h1>
        <div class="blog-content" data-aos="fade-up">
            {#each data.contents as content}
            <a href="{content.id}" class="blog-item">
                <div class="blog-img">
                    <img src={content.eyecatch?.url} alt="" width="400" height="266">
                </div>
                <div class="blog-text">
                    <div class="blog-line1">
                        <div class="category">{content.category.name}</div><div class="date"><i class="material-icons schedule-icons">schedule</i>{dayjs(content.publishedAt).format('YYYY.MM.DD')}</div>
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