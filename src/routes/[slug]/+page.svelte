<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>ブログ</title>
  <meta name="description" content="Svelte demo app" />
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