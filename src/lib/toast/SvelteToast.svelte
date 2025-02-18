<script>
	import { run } from 'svelte/legacy';

	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toast } from '$stores/toaststore';
	import ToastItem from './ToastItem.svelte';

	
	
	/** @type {{options?: import('./stores.js').SvelteToastOptions, target?: (string|'default')}} */
	let { options = {}, target = 'default' } = $props();

	/** @type {import('./stores.js').SvelteToastOptions[]} */
	let items = $state([]);

	/** @param {Object<string,string|number>} [theme] */
	function getCss(theme) {
		return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '') : undefined;
	}

	run(() => {
		toast._init(target, options);
	});

	run(() => {
		items = $toast.filter((i) => i.target === target);
	});
</script>

<ul class="_toastContainer">
	{#each items as item (item.id)}
		<li
			class={item.classes?.join(' ')}
			in:fly={item.intro}
			out:fade
			animate:flip={{ duration: 200 }}
			style={getCss(item.theme)}
		>
			<ToastItem {item} />
		</li>
	{/each}
</ul>

<style>
	._toastContainer {
		top: var(--toastContainerTop, 1.5rem);
		right: var(--toastContainerRight, 2rem);
		bottom: var(--toastContainerBottom, auto);
		left: var(--toastContainerLeft, auto);
		position: fixed;
		margin: 0;
		padding: 0;
		list-style-type: none;
		pointer-events: none;
		z-index: var(--toastContainerZIndex, 9999);
	}
</style>
