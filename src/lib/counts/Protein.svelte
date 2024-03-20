<script>
	import { onMount, afterUpdate } from 'svelte';
	import { today, settings, goals } from '$stores/stores';
	import { toTwoDecimals } from '$utils/numbers';
	import Counter from '$lib/counts/Counter.svelte';
	import Spinner from '$lib/Spinner.svelte';

	let title = '🍗 protein (g)';

	$: diff = 0;
	$: diffString = 'loading...';

	const diffUpdate = () => {
		if ('protein' in $goals) {
			diff = toTwoDecimals($goals.protein.value - $today.protein);
			diffString = diff >= 0 ? `${diff} remaining` : `${-diff} over goal!`;
		} else {
			diffString = `<a data-sveltekit-reload href='/'>Oops! Click to refresh</a>`;
		}
	};

	onMount(() => {
		goals.init().then(() => {
			diffUpdate();
		});
	});
	afterUpdate(() => {
		diffUpdate();
	});
</script>

{#await today.init()}
	<Spinner />
{:then}
	{#await settings.init()}
		<Spinner />
	{:then}
		<Counter
			{title}
			{diffString}
			bind:interval={$settings.proteinInterval.value}
			bind:count={$today.protein}
		/>
	{:catch error}
		<p>Settings error: {error}</p>
	{/await}
{:catch error}
	<p>Error creating 'today': {error}</p>
{/await}
