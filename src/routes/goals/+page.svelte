<script>
    import Water from '$lib/goals/Water.svelte';
    import Calories from '$lib/goals/Calories.svelte';
    import Salt from '$lib/goals/Salt.svelte';
    import Protein from '$lib/goals/Protein.svelte';
</script>

<h2>🥇 goals</h2>
  <div class="wrapper">
    <div class="item">
      <p>Set your water goal (ml)</p>
      <Water />
    </div>
    <div class="item">
      <p>Set your calorie limit</p>
      <Calories />
    </div>
    <div class="item">
      <p>Set your sodium limit (mg)</p>
      <Salt />
    </div>
    <div class="item">
      <p>Set your protein goal</p>
      <Protein />
    </div>
</div>

<style>
    h2 {
        text-align: center;
    }
    .wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      width: 100%;
      gap: 15px;
    }
    .item {
      text-align: center;
      flex: 1 1 auto;
      max-width: 32%;
      padding: 0;
    }
    @media screen and (max-width: 925px) {
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
