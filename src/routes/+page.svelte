<script lang="ts">
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import type { PageData } from "./$types";
    import dayjs from "dayjs";
    export let data: PageData;
    import { onMount, beforeUpdate } from 'svelte';
    import { TweenMax, Expo } from "gsap";
    onMount(() => {
        AOS.init();
        TweenMax.from('.cover', 1.5, {
            width: "100%",
            height: "100%",
            background: "#eed770",
            display: "flex",
            zIndex: 1000,
            opacity: 1,
            top: "0%",
            left: "0%",
        })
        TweenMax.from('.moon', .3, {
            delay: 1.6,
            width: "100%",
            height: "100%",
            background: "#eed770",
            display: "flex",
            zIndex: 999,
            borderRadius: 0,
            opacity: 1,
            top: "0%",
            left: "0%",
            fontSize: "3em",
            ease: Expo.easeInOut,
        })

        TweenMax.from('nav', .3, {
            delay: 1.9,
            opacity: 0,
            y: 20,
        })

        TweenMax.from('.moon-title', .3, {
            delay: 1.6,
            opacity: 1,
            display: "block",
        })

        TweenMax.from('.moon-text', .3, {
            delay: 1.9,
            opacity: 0,
            x: 20,
            display: "none",
            ease: Expo.easeInOut,
        })

        TweenMax.from('.open', .5, {
            delay: 2.2,
            opacity: 0,
        })

        TweenMax.from('.sub-read', .5, {
            delay: 2.2,
            opacity: 0,
            y: -20,
            ease: Expo.easeInOut,
        })

        TweenMax.from('.main-read', .5, {
            delay: 2.7,
            opacity: 0,
            x: -20,
            ease: Expo.easeInOut,
        })

        let pcNavLinks = document.querySelectorAll('.pc-nav .a-nav');
        let spNav = document.querySelector('.sp-nav');
        pcNavLinks.forEach(function(link) {
            let linkCopy = link.cloneNode(true);
            spNav.appendChild(linkCopy);
        });

        document.querySelector('.open').addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.sp-nav').classList.toggle('panelactive');
            document.querySelector('.circle').classList.toggle('circleactive');
        });

        let navLinks = document.querySelectorAll('.sp-nav a');
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                document.querySelector('.open').classList.remove('active');
                document.querySelector('.sp-nav').classList.remove('panelactive');
                document.querySelector('.circle').classList.remove('circleactive');
            });
        }
    });

    beforeUpdate(() => {
        AOS.refresh();
    });
</script>
<svelte:head>
    <title>Svelte Base</title>
    <meta name="description" content="Svelte × Jamstack" />
</svelte:head>
<div class="cover"></div>
<header>
    <div class="moon"><span class="moon-title">Svelete <br class="sp">Base</span><a class="moon-text" href="#a01">About <br class="sp">Svelete</a></div>
    <div class="header-inner">
        <div class="open">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="pc-nav">
            <a href="#a01" class="a-nav">About</a>
            <a href="#a02" class="a-nav">Skills</a>
            <a href="./" class="a-logo">Svelte Base</a>
            <a href="#a03" class="a-nav">Blog</a>
            <a href="#a04" class="a-nav">Contact</a>
        </nav>
        <nav class="sp-nav"></nav>
        <div class="circle"></div>
    </div>
    <div class="main-box">
        <span class="main-read">Web<br>development</span>
        <div class="sub-read">Svelte × Jamstack</div>
        <div class="scrolldown"><span></span></div>
    </div>
</header>
<main>
    <section id="a01">
        <div class="container">
            <h1>About</h1>
            <div class="flex-box">
                <div class="about-image">
                    <img src="/image/about.jpg" alt="">
                </div>
                <div class="about-text">
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
        <div class="blog-content">
            {#each data.contents as content}
            <a href="{content.id}" class="blog-item">
                <div class="blog-img">
                    <img src={content.eyecatch?.url} alt="">
                </div>
                <div class="blog-text">
                    <div class="category">{content.category.name}</div><div class="date">{dayjs(content.publishedAt).format('YYYY.MM.DD')}</div>
                    <h2 class="title">{content.title}</h2>
                </div>
            </a>
            {/each}
        </div>
        </div>
    </section>
    <section id="a04">
        <div class="container">
        <h1>Contact</h1>
        <div class="form-box">
            <div class="form-item">
                <input id="name" name="name" placeholder="Name" autocomplete="name">
                <input id="email" name="email" type="email" placeholder="Email" autocomplete="email">
                <textarea id="message" name="message" placeholder="Message"></textarea>
                <button type="submit">Submit</button>
            </div>
        </div>
        </div>
    </section>
</main>
<footer>
    <small>©︎Svelte Base 2023</small>
</footer>