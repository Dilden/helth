<script>
    import {todayStore} from '../stores/local';
    import {thePast} from '../utils/dates';

    let dateObj = new Date($todayStore.date);
    let format = dateObj.getMonth() + 1  + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
</script>
<h2>{format}</h2>
<style>

    h2 {
        text-align: center;
    }
</style>
