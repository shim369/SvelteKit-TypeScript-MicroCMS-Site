<script lang="ts">
    import { onMount } from 'svelte';
    export let openButton: HTMLElement;
    let pcNavLinks: NodeListOf<Element>;
    let spNav: HTMLElement | null;
    let circle: HTMLElement | null;

    onMount(() => {
        pcNavLinks = document.querySelectorAll('.pc-nav .a-nav');
        spNav = document.querySelector('.sp-nav');
        circle = document.querySelector('.circle');

        if(spNav !== null && circle !== null){
            pcNavLinks.forEach(function(link: Element) {
                let linkCopy = link.cloneNode(true);
                if(spNav !== null){
                    spNav.appendChild(linkCopy);
                }
            });


            openButton.addEventListener('click', function(this: HTMLButtonElement) {
                this.classList.toggle('active');
                if(spNav){
                    spNav.classList.toggle('panelactive');
                }
                if(circle){
                    circle.classList.toggle('circleactive');
                }
            });

            let navLinks = document.querySelectorAll('.sp-nav a');
            for (let i = 0; i < navLinks.length; i++) {
                navLinks[i].addEventListener('click', function() {
                    document.querySelector('.open')?.classList.remove('active');
                    spNav?.classList.remove('panelactive');
                    document.querySelector('.circle')?.classList.remove('circleactive');
                });
            }
        }
    });
</script>
<div class="header-inner">
    <div class="open" bind:this={openButton}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <nav class="pc-nav">
        <a href="./#a01" class="a-nav">About</a>
        <a href="./#a02" class="a-nav">Skills</a>
        <a href="./" class="a-logo">Svelte Base</a>
        <a href="./#a03" class="a-nav">Blog</a>
        <a href="./#a04" class="a-nav">Contact</a>
    </nav>
    <nav class="sp-nav"></nav>
    <div class="circle"></div>
</div>