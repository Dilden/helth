<script>
    import Water from '$components/goals/Water.svelte';
    import Calories from '$components/goals/Calories.svelte';
    import Salt from '$components/goals/Salt.svelte';
</script>

<h2>goals 🥇</h2>
<div class="container">
    <div class="wrapper">
      <div class="item">
        <p>Set your water intake goal</p>
        <Water />
      </div>
      <div class="item">
        <p>Set your calorie intake limit</p>
        <Calories />
      </div>
      <div class="item">
        <p>Set your sodium intake limit (mg)</p>
        <Salt />
      </div>
  </div>
</div>

<style>
    h2 {
        text-align: center;
    }
    .container {
      padding: 0 15px;
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
</style>
