<script>
	import Water from '$lib/counts/Water.svelte';
	import Calories from '$lib/counts/Calories.svelte';
	import Salt from '$lib/counts/Salt.svelte';
	import Protein from '$lib/counts/Protein.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';

</script>

<h2 class="text-center">🗒 track</h2>
<Date />

<div
	class="flex-start flex w-full flex-row flex-wrap justify-center gap-4 gap-y-7 md:gap-y-3 md:justify-start"
>
  <!-- TODO: Iterate over all trackable nutrients -->
  <!-- Convert this to tailwind then -->
	<div class="item"><Water /></div>
	<div class="item"><Calories /></div>
	<div class="item"><Salt /></div>
	<div class="item"><Protein /></div>
</div>

<Add />

<style>
	.item {
		-webkit-box-flex: 2 1 auto;
		-moz-box-flex: 2 1 auto;
		-webkit-flex: 2 1 auto;
		-ms-flex: 2 1 auto;
		flex: 2 1 auto;
		margin: auto;
		max-width: 30%;
	}
	@media screen and (max-width: 925px) {
		.item {
			max-width: 65%;
		}
	}
	@media screen and (max-width: 525px) {
		.item {
			max-width: 95%;
		}
	}
</style>
