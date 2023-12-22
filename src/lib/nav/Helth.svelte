<script>
  import logoUrl from './logo.svg';
</script>
<a href="/" class="hover:no-underline">
  <img src="{logoUrl}" alt="Meme man wearing a lab coat and stehoscope" width="200" height="auto" class="w-auto max-w-xs h-full m-0 p-0 inline-block align-middle"/>
  <h1 class="align-middle inline-block text-[--fore-color]">helth.app</h1>
</a>

<style>
  @media screen and (max-width: 925px) {
    h1 {
      font-size: calc( 1rem * var(--heading-ratio) * var(--heading-ratio) * var(--heading-ratio) );
    }
  }
  @media screen and (max-width: 500px) {
    h1 {
      font-size: calc( 1rem * var(--heading-ratio) );
    }
    img {
        width: auto;
        max-width: 120px;
    }
  }
</style>
