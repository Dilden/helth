<script>
  import Navigation from '$components/Nav/Navigation.svelte';
  import Footer from '$components/Nav/Footer.svelte';
</script>

<div class='main'>
  <Navigation />
  <div class='content'>
    <slot />
  </div>
  <div class='footer'>
    <Footer />
  </div>
</div>

<style>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex-shrink: 0;
  }
</style>
