<script>
  import Navigation from '$components/nav/Navigation.svelte';
  import Footer from '$components/nav/Footer.svelte';
  import { onMount } from 'svelte';
  import { browser, dev } from '$app/environment';

  let ReloadPrompt;
  onMount(async() => {
      !dev && browser && (ReloadPrompt = (await import('$components/ReloadPrompt.svelte')).default)
    });
</script>

<svelte:head>
  {#if (!dev && browser)}
    <link rel="manifest" href="/_app/manifest.webmanifest">
  {/if}
</svelte:head>

<div class='main'>
  <Navigation />
  <div class='content'>
    <slot />
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
