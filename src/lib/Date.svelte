<script>
  import { onMount } from 'svelte';
  import { today } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

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
    })

  })
</script>

{#await today.init()}
  <Spinner />
{:then}
  <h3>{format}</h3>
{/await}

<style>
  h3 {
    text-align: center;
    position: absolute;
  }
  @media screen and (max-width: 620px) {
    h3 {
      position: inherit;
    }
  }
</style>
