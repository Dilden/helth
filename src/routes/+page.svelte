<script>
  import Water from '$lib/counts/Water.svelte';
  import Calories from '$lib/counts/Calories.svelte';
  import Salt from '$lib/counts/Salt.svelte';
  import Protein from '$lib/counts/Protein.svelte';
  import Date from '$lib/Date.svelte';
  import Add from '$lib/Add.svelte';

  export let data = [];
</script>

<h2>track 🗒</h2>
<Date />

<div class="wrapper">
  <div class="item"><Water /></div>
  <div class="item"><Calories /></div>
  <div class="item"><Salt /></div>
  <div class="item"><Protein /></div>
</div>

<Add inventory={data.inventory}/>

<style>
    h2 {
        text-align: center;
    }
    .wrapper {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      width: 100%;
      row-gap: 30px;
      gap: 15px;
    }
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
      .wrapper {
        justify-content: center;
        row-gap: 10px;
      }
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
