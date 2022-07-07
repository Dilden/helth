<script>
  import Chart from '$components/charts/Chart.svelte';
  let data = [12, 19, 3, 5, 2, 30];
  let labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Pickle'];
</script>

<Chart chartType="line" data={data} labels={labels} title='Calories'/>
