<script>
	import { preventDefault } from 'svelte/legacy';

	/** @type {{searchStoreVal?: any, searchTitle?: string, scrollTo?: boolean}} */
	let { searchStoreVal = $bindable({}), searchTitle = 'Search', scrollTo = true } = $props();

	const scrollIt = () => {
		const top = document.getElementById('searching-' + searchTitle);
		top.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<label class="m-0 block w-full" id="searching-{searchTitle}" for="search-{searchTitle}"
	>{searchTitle}</label
>
<span class="flex justify-start focus-within:outline">
	<input
		class="m-0 block w-full border-none focus-within:outline-none"
		id="search-{searchTitle}"
		bind:value={searchStoreVal}
		type="text"
		placeholder="Begin typing..."
		onfocus={() => (scrollTo ? scrollIt : false)}
	/>
	<button
		class="border-none"
		aria-label="Clear search"
		onclick={preventDefault(() => (searchStoreVal = ''))}>❌</button
	>
</span>
