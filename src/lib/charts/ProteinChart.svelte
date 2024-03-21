<script>
	import { history, goals } from '$stores/stores';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	export let range = 7;
	const data = () => {
		return [
			{
				label: 'Protein',
				data: $history.map((el) => el.protein).slice(Number(-range)),
				backgroundColor: '#fce417',
				borderColor: '#fce417'
			}
		];
	};
	const labels = () => {
		return $history
			.map((el) => {
				let date = new Date(el.date);
				return date.toLocaleDateString();
			})
			.slice(Number(-range));
	};
</script>

<h3>Protein</h3>
{#await history.init()}
	<Spinner />
{:then}
	{#await goals.init()}
		<Spinner />
	{:then}
		<Chart
			chartType="line"
			data={data()}
			labels={labels()}
			goal={$goals.protein.value}
			unit={'grams'}
		/>
	{/await}
{:catch error}
	<p>error</p>
{/await}
