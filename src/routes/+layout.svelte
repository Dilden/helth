<script>
  import "../app.css";
  import Navigation from '$lib/nav/Navigation.svelte';
  import Footer from '$lib/nav/Footer.svelte';
  import { dbopen, persist, isStoragePersisted } from '$stores/db';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import Spinner from '$lib/Spinner.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { confirmDialog } from '$utils/toast.js';

  onMount(async() => {
    const status = await isStoragePersisted();
    if(!status) {
      confirmDialog('Don\'t lose your data! Make storage persistent now?', persist, () => console.log('denied'), true);
    }
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
<SvelteToast />

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt}}
  <ReloadPrompt />
{/await}

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
