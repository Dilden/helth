<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import annotationPlugin from 'chartjs-plugin-annotation/dist/chartjs-plugin-annotation.js';
  
  Chart.register(...registerables, annotationPlugin);

  let chart;
  export let chartType = 'line';
  export let data = [];
  export let labels = [];
  export let unit = '';
  export let goal = 0;

  const annotation = {
      type: 'line',
      borderColor: 'grey',
      borderWidth: 3,
      scaleID: 'y',
      value: goal,
      label: {
          content: "Goal",
          display: true,
          position: 'end'
      }
  };

  onMount(()=> {
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
  <canvas bind:this={chart} width={1000} />
</div>

<style>
  .chart {
    position: relative;
    margin: 0 auto;
    display: inline-block;
    width: 90vw;
    height: auto;
    max-width: 1000px;
  }
</style>
