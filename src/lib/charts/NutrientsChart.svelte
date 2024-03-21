<script>
	import { history, limits } from '$stores/stores';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	export let range = 7;
	const data = () => {
		return [
			{
				label: 'Sodium',
				data: $history.map((el) => el.sodium).slice(Number(-range)),
				backgroundColor: '#ffffff',
				borderColor: '#ffffff'
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

<h3>Sodium</h3>
{#await history.init()}
	<Spinner />
{:then}
	{#await limits.init()}
		<Spinner />
	{:then}
		<Chart
			chartType="line"
			data={data()}
			labels={labels()}
			limit={$limits.sodium.value}
			unit={'mg'}
		/>
	{/await}
{:catch error}
	<p>error</p>
{/await}
