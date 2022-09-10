<script>
  import Water from '$components/counts/Water.svelte';
  import Calories from '$components/counts/Calories.svelte';
  import Salt from '$components/counts/Salt.svelte';
  import Protein from '$components/counts/Protein.svelte';
  import Date from '$components/Date.svelte';
  import Barcode from '$components/Barcode.svelte';

</script>

<Date />
<h2>track 🗒</h2>

<div class="wrapper">
  <div class="item"><Water /></div>
  <div class="item"><Calories /></div>
  <div class="item"><Salt /></div>
  <div class="item"><Protein /></div>
</div>

<Barcode />

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
