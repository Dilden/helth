<script>
  import Navigation from '$components/nav/Navigation.svelte';
  import Footer from '$components/nav/Footer.svelte';
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
