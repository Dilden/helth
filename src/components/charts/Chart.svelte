<script>
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto/auto.js';

  let chart;
  export let chartType = 'line';
  export let data = [];
  export let labels = [];
  export let unit = '';
  export let goal = 0;

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
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                          let retStr = '';
                            if(goal > 0 && value == goal) {
                            retStr = 'goal - ';
                          }
                          return retStr + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                        }
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
  }
</style>
