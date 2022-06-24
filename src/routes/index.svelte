<script>
    import Water from '../components/Water.svelte';
    import Calories from '../components/Calories.svelte';
    import Salt from '../components/Salt.svelte';
    import Date from '../components/Date.svelte';
    import Barcode from '../components/Barcode.svelte';
</script>

<h2>tracker 💪</h2>

<div class="container">
  <Date />
  <div class="wrapper">
    <div class="item"><Water /></div>
    <div class="item"><Calories /></div>
    <div class="item"><Salt /></div>
  </div>
</div>

<Barcode />

<style>
    h2 {
        text-align: center;
    }
    .container {
      padding: 0 15px;
    }
    .date {
        grid-column-start: 1;
        grid-column-end: 4;
    }
    .wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      width: 100%;
      gap: 15px;
    }
    .item {
      flex: 1 1 auto;
      max-width: 32%;
      padding: 0;
    }
</style>
