<a href="/">
  <img src="/helth.jpg" alt="Meme man wearing a lab coat and stehoscope" width="200" height="auto" />
  <h1>helth app</h1>
</a>

<style>
    img {
        width: auto;
        max-width: 150px;
        height: 100%;
        margin: 0;
        padding: 0;
        display: inline-block;
        vertical-align: middle;
    }
    h1 {
        display: inline-block;
        color: var(--fore-color);
        vertical-align: middle;
    }
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
