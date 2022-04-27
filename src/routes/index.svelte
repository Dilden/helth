<script>
    import Water from '../components/Water.svelte';
    import Calories from '../components/Calories.svelte';
    import Salt from '../components/Salt.svelte';
    import Helth from '../components/Helth.svelte';
    import Date from '../components/Date.svelte';
    import Barcode from '../components/Barcode.svelte';

</script>
<div class="container">
    <div class="row">
        <div class="col-md-12 centered">
            <Date />
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-12">
            <Water/>
        </div>
        <div class="col-md-4 col-sm-12">
            <Calories/>
        </div>
        <div class="col-md-4 col-sm-12">
            <Salt/>
        </div>
    </div>
    <div class="row">
        <div class='col-md-12'>
            <Barcode />
        </div>
    </div>
</div>
<Helth />
