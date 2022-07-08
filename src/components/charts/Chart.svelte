<script>
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto/auto.js';

  let chart;
  export let chartType = 'line';
  export let data = [];
  export let labels = [];
  export let title = '';
  export let color = '#000000';

  onMount(()=> {
      const ctx = chart.getContext('2d');
      const myChart = new Chart(ctx, {
          type: chartType,
          data: {
              labels: labels,
              datasets: [{
                  label: title,
                  data: data,
                  backgroundColor: color,
                  borderColor: color,
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  });


</script>

<canvas bind:this={chart} width={400} height={400} />
