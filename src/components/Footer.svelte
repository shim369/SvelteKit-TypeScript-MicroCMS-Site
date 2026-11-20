<script lang="ts">
	import { page } from '$app/state';

	const links = ['About', 'Skills', 'Blog', 'Contact'];
	const base = $derived(page.url.pathname === '/' ? '' : '/');
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<svg class="footer__ridge" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"
		><path
			fill="currentColor"
			d="M0 0h1440v26l-120 22-90-30-140 40-110-34-150 44-100-28-160 30-120-46-150 52-110-38L0 50Z"
		/></svg
	>
	<div class="wrap">
		<div class="footer__in">
			<a href={base ? '/' : '#top'} class="footer__logo">Svelte<b>.</b>Base</a>
			<nav aria-label="フッター">
				{#each links as l}<a href="{base}#{l.toLowerCase()}">{l}</a>{/each}
				<a href="https://github.com/shim369" target="_blank" rel="noopener noreferrer">GitHub</a>
			</nav>
		</div>
		<small>&copy; {year} Svelte Base</small>
	</div>
</footer>
