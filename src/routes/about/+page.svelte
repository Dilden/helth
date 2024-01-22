<div class='text-center'>
  <h2>Sponsors</h2>
  <p>You can be the first! Just visit <a href="https://github.com/sponsors/Dilden">https://github.com/sponsors/Dilden</a> to fund the development of this app and get your name listed right here.</p>
  
  <h2>FAQ</h2>
  <h3>the app</h3>
  <details>
    <summary>What is helth app?</summary>
    <p>Helth app is a <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps">Progressive Web App</a> (PWA) that allows users to track calories, nutrients, and water in-take. Essentially, it's a website that can be installed on a device without having to be downloaded from an app store. The idea arose from the frustration of using popular apps that provide similar functionality at the cost of user privacy by including advertisements and extra features I didn't care for. Helth app does NOT offer health or fitness advice.</p>
  </details>
  <details>
    <summary>Why the misspelled name?</summary>
    <p>Because helth app (or helth.app) started as a joke. I thought <a href="https://en.wikipedia.org/wiki/Meme_Man">meme man</a> was funny. When I started the app, I liked to joke about how unhealthy some of my eating habits were.</p>
  </details>
  <details >
    <summary>Ok, but who are you?</summary>
    <p>Oh, right, sorry. My name is Dylan and I like to build web apps. I do some writing about web application development over at <a href="https://www.closingtags.com/">https://www.closingtags.com/</a> if you're into that sort of thing. I have a short bio that you can read on my <a href="https://www.closingtags.com/about">about page</a>. You'll also find links to my social media and a <a href="https://www.closingtags.com/contact/">contact form</a> on my website if you want to get in touch.</p>
  </details>
  <details >
    <summary>How do I use helth app?</summary>
    <p>Its recommended to install helth app on your device for the most consistent experience. For instructions on how to do this with your device, see here: <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing">https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing</a>. You can also use it just like a normal website in your device's web browser.</p>
    <p>The app is intended to track your daily intake of water, calories, and nutrients. Just input your data to the daily counters on the home page by using the "+" or "-" buttons. Move the slider to increase or decrease the amount you want to add or subtract with each button press from your daily total. You can also set the count for each item directly in the text box.</p>
    <p>If you click the <span style="background-color: var(--secondary-back-color)">➕</span> button in the bottom right corner, you'll see a pop-up with the tabs "Inventory", "Recipes", and "Scan". Going to the "Scan" tab will allow you to scan the barcode (after you grant the app permission to use your camera) of a food's packaging. Once scanned, that item will be automatically added to your Inventory. From the Inventory, you can modify or adjust any values of the scanned items, add that them to your daily total, or add an item to a Recipe. Recipes are convenient for adding multiple items to your daily total.</p>
  </details>

  <h3>data & privacy</h3>
  <details >
    <summary>What is this prompt about "persistent storage?"</summary>
    <p>Helth app uses a technology called <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>, which is a type of database that exists in modern browsers. When a browser thinks its storage has reached its limits, the browser may automatically wipe out data from various sites. To ensure your data (Inventory, Recipes, Historical data, etc.) from helth app isn't lost, its best to enable this feature so the data is only removed when <b>you</b> say it should be.</p>
  </details>
  <details >
    <summary>What user data does this app collect?</summary>
    <p>That's the best part; NONE! I don't want your data. Managing your data sounds like a giant headache. All of the data you input into helth app is stored locally on your device. If you clear your browser cache, that data WILL BE LOST.</p>
    <p>When you scan a barcode with the barcode scanner, your device connects to the Open Food Facts API to retrieve the appropriate data. The helth app server currently doesn't have any clue what you're looking up.</p>
  </details>
  <details >
    <summary>What is Open Food Facts?</summary>
    <!-- TODO: Find data collected and stored by Open Food Facts API -->
    <p>Open Food Facts is a non-profit that operates a crowd-sourced food packaging database made by the people, for the people. You can read more about it on their website at <a href="https://world.openfoodfacts.org/discover">https://world.openfoodfacts.org/discover</a>. Because all of the data from Open Food Facts is submitted by users, there is no guarantee that it will be 100% accurate. But in the future, helth app users will be able to contribute back to Open Food Facts to ensure any products you've discovered can be given back to the community.</p>
  </details>
  <details >
    <summary>Isn't this hosted on Cloudflare?</summary>
    <!-- TODO: find cloudflare privacy policy, information logged -->
    <p>Yes, Cloudflare is currently used for hosting this application. No, it's not ideal. But it is also currently free. Cloudflare provides DNS and hosting for helth.app and as such, they monitor traffic coming in and going out though they do so without the use of installing tracking cookies on your device.</p>
  </details>
  <details >
    <summary>I don't want to lose my data! What do I do?</summary>
    <p>In the future, helth app will offer a subscription sync service for a monthly fee. Purchasing this subscription will ensure your data can be easily retrieved, even if you lose your device while having the added benefit of supporting development of the project. <s>In the meantime, go to the <a href="/data">settings page</a> and be sure to export your data regularly.</s> Data export/import functionality is currently broken, but we're working on it!</p>
  </details>

  <h3>misc</h3>
  <details >
    <summary>I found a bug/something is broken. How do I report it?</summary>
    <p>If you have a GitHub account, feel free to report the issue on the <a href="https://github.com/Dilden/helth/issues">official repository</a>. Otherwise, send an email to <a href="mailto:support@helth.app?subject=helth app help">support@helth.app</a> with as much information as you can. Helpful tidbits of information are what device you were using, which version operating system is your device running, what browser you used, what street you grew up on, what your mother's maiden name is, what are the last 4 digits of your social security number, etc.</p>
  </details>
  <details >
    <summary>What is this app built with?</summary>
    <p>This app uses many technologies to function. It would <s>not be possible</s> have been a lot tougher without the following open-source projects:</p>
      <ul>
        <li><a href="https://svelte.dev">Svelte</a> for compiling the templates and components used throughout the User Interface (UI)</li>
        <li><a href="https://kit.svelte.dev/">SvelteKit</a> to handle routing and overall management of Svelte projects</li>
        <li><a href="https://dexie.org">Dexie</a> to interface and manage the data store in <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></li>
        <li><a href="https://www.chartjs.org/">Chart.js</a> to present trends in your historical data</li>
        <li><a href="https://github.com/zxing-js/library">zxing-js</a> for scanning barcodes</li>
        <li><a href="https://vite-pwa-org.netlify.app/">Vite PWA</a> to make managing <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app#technical_features_of_pwas">service workers and manifest</a> a breeze</li>
      </ul>
      <p>For even more information or to follow along with the development of the project, visit <a href="https://github.com/Dilden/helth">https://github.com/Dilden/helth</a>.</p>
  </details>
  <details >
    <summary>I like this project. How can I help make it better?</summary>
    <p>For real?! Ah, thanks so much. That means a lot to me. The first thing you can do is tell your friends, family, coworkers, acquaintances, and random people on the street about it.</p>
    <p>If you don't like talking to people or have no friends, there's a good chance you'll be more interested in the code. You can check out the <a href="https://github.com/Dilden/helth">GitHub repository</a> for this project and make a contribution. There is a whole list of known bugs and features that still need to be built. Pull requests are welcome!</p>
    <p>If talking to people or writing code isn't your thing, then maybe philanthropy is. Donations, even the amount for a coffee or beer; tells me that you appreciate the work I've put into this app. If you donate to this project, I'll even feature your name here on this very page!</p>
    <p>To sponsor me on GitHub, visit <a href="https://github.com/sponsors/Dilden">https://github.com/sponsors/Dilden</a>. If you don't have a GitHub account, you can also make a one-time donation via Stripe for <a href="https://buy.stripe.com/bIY7sX4IP2tjcVydQQ">$5</a>, <a href="https://buy.stripe.com/fZe8x13ELec15t67sv">$10</a>, <a href="https://buy.stripe.com/fZe8x13ELec15t67sv">$20</a>, <a href="https://buy.stripe.com/28o28D4IP9VL5t68wx">$50</a>, or <a href="https://buy.stripe.com/14k4gL1wD9VLg7K6os">$100</a>.</p>
  </details>
  <h3>changelog</h3>
  <details >
    <summary>v0.1.3</summary>
    <ul>
      <li>New logo! Updated all icons to reflect new logo as well.</li>
      <li>Moved the meme man to the navigation drawer</li>
    </ul>
  </details>
  <details >
    <summary>v0.1.2</summary>
    <ul>
      <li>Add support for Tailwind CSS which should hopefully speed up building</li>
      <li>Barcode scanner now using Tailwind styles</li>
      <li>Item form now using Tailwind styles</li>
      <li>Recipe form now using Tailwind styles</li>
    </ul>
  </details>
  <details >
    <summary>v0.1.1</summary>
    <ul>
      <li>Deleted a closingtag that somehow got left in. Ironic, I know.</li>
      <li>Item.barcode is now treated as a string as some barcodes have leading 0s and Numbers don't allow that.</li>
      <li>Refactored Barcode scanner + data formatter for OpenFoodFacts API</li>
      <li>Removed unused 2nd data source</li>
    </ul>
  </details>
  <details >
    <summary>v0.1.0</summary>
    <ul>
      <li>BREAKING CHANGE: Upgraded DB to v4 where Nutrients list in Inventory Items are now an array of objects instead of a object of objects</li>
      <li>BREAKING CHANGE: Refactored input formatting code to account for array of nutrient objects</li>
      <li>Introduced TypeScript into conversion code</li>
      <li>Styling changes to use more screen space on Inventory input form</li>
      <li>Fixed issues of duplicate items and nutrients being shown on Recipes</li>
    </ul>
  </details>
  <details>
    <summary>Pre 0.1.0</summary>
    <details >
      <summary>v0.0.26</summary>
      <ul>
        <li>Fixed import/export to work with IndexedDB</li>
        <li>Confirm an import will overwrite all existing data before proceeding</li>
        <li>Added import progress bar while import runs</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.25</summary>
      <ul>
        <li>Toast prompt shown asking if user would like to add to daily total if scanned barcode already exists in inventory</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.24</summary>
      <ul>
        <li>Moved controls below scanner video feed</li>
        <li>Reduced size of ➕ button</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.23</summary>
      <ul>
        <li>Added button to the end of search text to allow for clearing it quickly</li>
        <li>Scroll to search label when focusing on search bar</li>
        <li>Reduced redundant code around search component</li>
        <li>Added a pull request template so I quit forgetting to update this page</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.22</summary>
      <ul>
        <li>Fixed persistent storage prompt on iOS</li>
        <li>Adjusted video element so as to not cover controls on iOS and related devices</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.21</summary>
      <ul>
        <li>Adjusted controls + video of scanner</li>
        <li>Left-aligned inventory items in recipe edit form for consistent checkbox position</li>
        <li>Reduced gap between inputs on Recipe & Inventory edit forms</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.20</summary>
      <ul>
        <li>Added mobile formatting to about page</li>
      </ul>
    </details>
    <details >
      <summary>v0.0.19</summary>
      <ul>
        <li>Added this about page</li>
        <li>Switched icons to be in front of text in titles and nav menu</li>
        <li>Changed /data page to /settings</li>
        <li>Added title to settings page</li>
      </ul>
    </details>
  </details>
</div>

<style>
  h2 {
    text-align: center;
  }
  h3 {
    border-top: var(--secondary-back-color) dotted 2px;
    padding-top: .5rem;
  }
  details {
    margin: 0 auto;
    max-width: 75%;
    padding: 0 1.3rem;
    margin: 0 auto;
    text-align: left;
    font-size: 1.3em;
  }
  details > details {
    max-width: 100%;
    padding: 0 .5rem;
  }
  details[open] > summary {
    background-color: #151F22;
  }
  summary {
    padding: 1rem 1.3rem;
  }
  details > p {
    padding-bottom: .75rem;
  }

  @media screen and (max-width: 900px) {
    details {
      max-width: 100%;
    }
  }
</style>
