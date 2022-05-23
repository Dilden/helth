<script>
    import Water from '$components/goals/Water.svelte';
    import Calories from '$components/goals/Calories.svelte';
    import Salt from '$components/goals/Salt.svelte';
</script>

<h2>goals 🥇</h2>
<div class="container">
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

<style>
    h2 {
        text-align: center;
    }
    .container {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr 1fr;
    }
</style>
