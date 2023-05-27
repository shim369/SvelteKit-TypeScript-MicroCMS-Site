<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.title} | Svelte Base</title>
  <meta name="description" content={data.title} />
</svelte:head>

<main>
    <section>
        <div class="container">
            <div class="blog-detail">
                <h1>{data.title}</h1>
                <div class="eyecatch"><img src={data.eyecatch?.url} alt="" /></div>
                <div class="blog-detail-text">{@html data.content}</div>
            </div>
        </div>
    </section>
</main>