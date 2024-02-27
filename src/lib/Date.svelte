<script>
  import { onMount } from 'svelte';
  import { today } from '$stores/stores';
  import { thePast } from '$utils/dates';
  import Spinner from '$lib/Spinner.svelte';

  let dateObj, format;
  
  onMount(() => {
    today.init()
    .then(() => {
      dateObj = new Date($today.date);
      format =
          dateObj.getMonth() +
          1 +
          '/' +
          dateObj.getDate() +
          '/' +
          dateObj.getFullYear();

      document.addEventListener("visibilitychange", () => {
        if(thePast(dateObj)) {
          document.location.reload();
        }
      })
    });
  });
</script>

{#await today.init()}
  <Spinner />
{:then}
  <h3 class="text-center">{format}</h3>
{/await}
