<script>
  import Navigation from '$lib/nav/Navigation.svelte';
  import Footer from '$lib/nav/Footer.svelte';
  import { dbopen } from '$stores/db';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import Spinner from '$lib/Spinner.svelte';

  let ReloadPrompt;
  onMount(async() => {
      pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default)
    });

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<div class='main'>
  <Navigation />
  <div class='content'>
    {#await dbopen}
      <Spinner />
    {:then}
      <slot />
    {/await}
  </div>
  <div class='footer'>
    <Footer />
  </div>
</div>

{#if ReloadPrompt}
  <svelte:component this={ReloadPrompt} />
{/if}

<style>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1 0 auto;
    padding: 0 15px;
  }
  .footer {
    flex-shrink: 0;
  }
</style>
