<script lang="ts">
	import { onMount } from 'svelte';
	import { onScrollFrame } from '#lib/motion.ts';

	// 標高計：ふもと（Hero）から山頂（Contact）へ、いまどこにいるかを示す
	let marks = $state<{ label: string; top: number }[]>([]);
	let pinTop = $state(100);
	let on = $state(false);
	let dark = $state(false);

	onMount(() => {
		const sections = [...document.querySelectorAll<HTMLElement>('[data-alt]')];
		const darkAreas = [...document.querySelectorAll<HTMLElement>('.section--dark, .footer')];
		const maxScroll = () => document.documentElement.scrollHeight - innerHeight;

		// 下（ふもと）から上（山頂）へ登っていく
		const layout = () => {
			const max = maxScroll();
			marks = sections.map((s) => ({
				label: s.dataset.alt ?? '',
				top: 100 - Math.min(s.offsetTop / max, 1) * 100
			}));
		};

		const update = () => {
			const y = scrollY;
			const max = maxScroll();
			pinTop = 100 - (max > 0 ? y / max : 0) * 100;
			on = y > innerHeight * 0.6;
			const mid = y + innerHeight / 2;
			dark = darkAreas.some((el) => mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight);
		};

		// 画像の読み込みなどでページの高さが変わったら目盛りを置き直す
		const ro = new ResizeObserver(() => {
			layout();
			update();
		});
		ro.observe(document.body);
		const stop = onScrollFrame(update);

		return () => {
			ro.disconnect();
			stop();
		};
	});
</script>

<div class="altimeter" class:is-on={on} class:on-dark={dark} aria-hidden="true">
	<div class="altimeter__scale"></div>
	{#each marks as m}
		<div class="altimeter__mark" style:top="{m.top}%"><span>{m.label}</span></div>
	{/each}
	<div class="altimeter__pin" style:top="{pinTop}%"></div>
</div>
