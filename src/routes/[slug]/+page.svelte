<script lang="ts">
  import HeaderInner from '../../components/HeaderInner.svelte';
  import Footer from '../../components/Footer.svelte';
  import Contact from '../../components/Contact.svelte';
  import type { PageData } from "./$types";
  import dayjs from "dayjs";
  export let data: PageData;
    let openButton: HTMLElement;
</script>

<svelte:head>
  <title>{data.title} | Svelte Base</title>
  <meta name="description" content={data.title} />
</svelte:head>

<main>
  <HeaderInner {openButton} />
    <section>
        <div class="container">
            <div class="blog-detail">
                <h1>{data.title}</h1>
                <div class="blog-detail-date"><span class="material-icons schedule-icon">schedule</span>
                  {dayjs(data.publishedAt).format('YYYY.MM.DD')}</div>
                <div class="eyecatch"><img src={data.eyecatch?.url} alt="" /></div>
                <div class="blog-detail-text">{@html data.content}</div>
            </div>
        </div>
    </section>
    <Contact />
</main>
<Footer />