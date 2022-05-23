<script>
    import { todayStore } from '../stores/local';

    let dateObj = new Date($todayStore.date);
    let format =
        dateObj.getMonth() +
        1 +
        '/' +
        dateObj.getDate() +
        '/' +
        dateObj.getFullYear();
</script>

<h3>{format}</h3>

<style>
    h3 {
        text-align: center;
    }
</style>
