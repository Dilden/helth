<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';

	Chart.register(...registerables, annotationPlugin);

	let chart = $state();
	const chartType = 'line';
	// export let data = [];

	/** @type {{labels?: any, unit?: string, goal?: number, limit?: number, storeData: any, label?: string, color?: string}} */
	let {
		labels = [],
		unit = '',
		goal = 0,
		limit = 0,
		storeData,
		label = '',
		color = '#2417fc'
	} = $props();

	const data = [
		{
			label: label,
			data: storeData,
			backgroundColor: color,
			borderColor: color
		}
	];

	const annotation = {
		type: 'line',
		borderColor: 'grey',
		borderWidth: 3,
		scaleID: 'y',
		value: goal ? goal : limit,
		label: {
			content: goal ? 'Your goal' : 'Your limit',
			display: true,
			position: 'end'
		}
	};

	onMount(() => {
		const ctx = chart.getContext('2d');

		const myChart = new Chart(ctx, {
			type: chartType,
			data: {
				labels: labels,
				datasets: data
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
						title: {
							text: unit,
							display: true
						}
					}
				},
				plugins: {
					autocolors: false,
					annotation: {
						annotations: {
							annotation
						}
					}
				}
			}
		});
	});
</script>

<div class="chart">
	<canvas bind:this={chart} width={1000}></canvas>
</div>

<style>
	.chart {
		position: relative;
		margin: 0 auto;
		display: inline-block;
		width: 90vw;
		height: auto;
		max-width: 1000px;
		z-index: -1;
	}
</style>
