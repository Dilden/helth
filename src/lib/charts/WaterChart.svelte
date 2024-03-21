<script>
	import { history, goals } from '$stores/stores';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	export let range = 7;
	const data = () => {
		return [
			{
				label: 'Water',
				data: $history.map((el) => el.water).slice(Number(-range)),
				backgroundColor: '#2417fc',
				borderColor: '#2417fc'
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

<h3>Water</h3>
{#await history.init()}
	<Spinner />
{:then}
	{#await goals.init()}
		<Spinner />
	{:then}
		<Chart chartType="line" goal={$goals.water.value} data={data()} labels={labels()} unit={'ml'} />
	{/await}
{:catch error}
	<p>error</p>
{/await}
