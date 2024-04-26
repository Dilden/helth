<script>
	import { list } from '$utils/nutrients';
	import { today, settings, limits, goals } from '$stores/stores';
	import Counter from '$lib/counts/Counter.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';
	import Spinner from '$lib/Spinner.svelte';
</script>

<h2 class="text-center">🗒 track</h2>
<Date />

<div
	class="flex-start flex w-full flex-row flex-wrap justify-center gap-4 gap-y-7 md:justify-start md:gap-y-3"
>
	{#await Promise.all([today.init(), settings.init(), limits.init(), goals.init()])}
		<Spinner />
	{:then}
		{#each list as nutrient}
			{#if $settings[nutrient.key].value.enabled}
				<div class="m-auto flex-[2_1_auto] sm:max-w-full md:max-w-[65%] lg:max-w-[30%]">
					<Counter
						item={nutrient}
						bind:count={$today[nutrient.key]}
						bind:interval={$settings[nutrient.key].value.interval}
						limit={$limits[nutrient.key]?.value ? $limits[nutrient.key].value : null}
						goal={$goals[nutrient.key]?.value ? $goals[nutrient.key].value : null}
					/>
				</div>
			{/if}
		{/each}
	{/await}
</div>

<Add />
