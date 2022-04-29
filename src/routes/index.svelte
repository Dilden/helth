<script>
    import Water from '../components/Water.svelte';
    import Calories from '../components/Calories.svelte';
    import Salt from '../components/Salt.svelte';
    import Date from '../components/Date.svelte';
    import BarcodeModal from '../components/BarcodeModal.svelte';

</script>
<div class='container'>
    <div class='date'><Date /></div>
    <div class='item'><Water/></div>
    <div class='item'><Calories/></div>
    <div class='item'><Salt/></div>
</div>
<BarcodeModal />

<style>
    .container {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr 1fr;
    }
    .date {
        grid-column-start: 1;
        grid-column-end: 4;
    }

</style>
