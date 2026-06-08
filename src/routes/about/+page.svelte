<script>
	const version = APP_VERSION;
</script>

<div class="text-center">
	<h2>Sponsors</h2>
	<p>
		You can be the first! Just visit <a href="https://github.com/sponsors/Dilden"
			>https://github.com/sponsors/Dilden</a
		> to fund the development of this app and get your name listed right here.
	</p>

	<h2>FAQ</h2>
	<h3>the app</h3>
	<details>
		<summary>What is "helth app"?</summary>
		<p>
			helth.app is a <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
				>Progressive Web App</a
			> (PWA) that allows users to track calories, nutrients, and water in-take. Essentially, it's a website
			that can be installed on a device without having to be downloaded from an app store. The idea arose
			from the frustration of using popular apps that provide similar functionality at the cost of user
			privacy by including advertisements and extra features I didn't care for. Helth app does NOT offer
			health or fitness advice.
		</p>
	</details>
	<details>
		<summary>Why the misspelled name?</summary>
		<p>
			Because helth app (or helth.app) started as a joke and I thought <a
				href="https://en.wikipedia.org/wiki/Meme_Man">meme man</a
			> was funny. When I started the app, I liked to joke about how unhealthy some of my eating habits
			were. I started working on this app to change those habits.
		</p>
	</details>
	<details>
		<summary>Ok, but who are you?</summary>
		<p>
			Oh, right, sorry. My name is Dylan and I like to build web apps. I do some writing about web
			application development over at <a href="https://www.closingtags.com/">closingtags.com</a>
			if you're into that sort of thing. I have a short bio that you can read on my
			<a href="https://www.closingtags.com/about">about page</a>. You'll also find links to my
			social media and a <a href="https://www.closingtags.com/contact/">contact form</a> on my website
			if you want to get in touch.
		</p>
	</details>
	<details>
		<summary>How do I use helth.app?</summary>
		<p>
			The app is intended to track daily intake of water, calories, and nutrients. Just input your
			data to the daily counters on the home page by using the "+" or "-" buttons. Each counter has
			a button to customize its settings (...). Move the slider to increase or decrease the amount
			you want to add or subtract with each button press from your daily total. You can also set the
			count for each item directly in the text box.
		</p>
		<p>
			By clicking the <span style="background-color: var(--secondary-back-color)">➕</span> button
			in the bottom right corner, you'll be presented with a pop-up which has the tabs "Inventory",
			"Recipes", and "Scan". Navigating to the "Scan" tab will allow you to scan the barcode (after
			you grant the app permission to use your camera) of a food's packaging. Once scanned, that
			item <i>should</i> be automatically added to your Inventory. Note that not every item may be listed
			in the OpenFoodFacts Database. From the Inventory, any values of the scanned items can be modified,
			added to the daily total, or added to a Recipe. Recipes are convenient for adding multiple items
			to the daily total at once.
		</p>
		<p>
			Its recommended to install helth.app on your device for the most consistent experience. For
			instructions on how to do this with your device, see <a
				href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing"
				>this guide from Mozilla</a
			>. You can also use it just like a normal website in your device's web browser.
		</p>
	</details>

	<h3>data & privacy</h3>
	<details>
		<summary>What is this prompt about "persistent storage?"</summary>
		<p>
			helth.app uses a technology called <a
				href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a
			>, which is a type of database that exists in modern browsers. When a browser thinks its
			storage has reached its limits, the browser may automatically wipe out data from various
			sites. To ensure your data (Inventory, Recipes, Historical data, etc.) from helth app isn't
			lost, its best to enable this feature so the data is only removed when <b>you</b> say it should
			be.
		</p>
	</details>
	<details>
		<summary>What user data does this app collect?</summary>
		<p>
			That's the best part; NONE! I don't want your data. Managing your data sounds like a giant
			headache. All of the data you input into helth app is stored locally on your device. If you
			clear your browser cache, that data WILL BE LOST.
		</p>
		<p>
			When you scan a barcode with the barcode scanner, your device connects to the Open Food Facts
			API to retrieve the appropriate data. The helth.app server currently doesn't have any clue
			what you're looking up.
		</p>
	</details>
	<details>
		<summary>What is Open Food Facts?</summary>
		<!-- TODO: Find data collected and stored by Open Food Facts API -->
		<p>
			Open Food Facts is a non-profit that operates a crowd-sourced food packaging database made by
			the people, for the people. You can read more about it on their website at <a
				href="https://world.openfoodfacts.org/discover">https://world.openfoodfacts.org/discover</a
			>. Because all of the data from Open Food Facts is submitted by users, there is no guarantee
			that it will be 100% accurate. But in the future, helth.app users will be able to contribute
			back to Open Food Facts to ensure any products you've discovered can be given back to the
			community.
		</p>
	</details>
	<details>
		<summary>Isn't this hosted on Cloudflare?</summary>
		<!-- TODO: find cloudflare privacy policy, information logged -->
		<p>
			Yes, Cloudflare is currently used for hosting this application. No, it's not ideal. But it is
			also currently free. Cloudflare provides DNS and hosting for helth.app and as such, they
			monitor traffic coming in and going out though they do so without the use of installing
			tracking cookies on your device.
		</p>
	</details>
	<details>
		<summary>I don't want to lose my data! What do I do?</summary>
		<p>
			If losing your device and data is a concern, consider purchasing a subscription to helth.app.
			Not only does your money contribute to making the app better, but your data will be stored in
			a cloud service provider. That way, if you lose your device or completely wipe your data,
			you'll be able to sync it from another device and recover your data later. Neat, huh? If
			you're not okay with this due to privacy concerns, I get it. You should then consider
			exporting your data regularly via the <a href="/data">settings page</a>. Your data will be
			downloaded from your device in an easy-to-read (for computers) file that can then be imported
			into helth.app on another device.
		</p>
	</details>
	<details>
		<summary>Who has acccess to my cloud data?</summary>
		<p>
			We, the development team at helth.app do you have access to any data you have synced with the
			cloud service. Likewise, our cloud service provider <a href="https://dexie.org/cloud/"
				>Dexie Cloud</a
			> also has access to your data. Currently, data is not encrypted as that would make development
			hard. We're aware that storing your data in some weird cloud service where the devs can see everything
			you log is not ideal. If that's the case, we'd suggest avoiding using the cloud sync service for
			now.
		</p>
		<p>
			If you aren't using the cloud sync feature, then you and you alone have access to your data!
		</p>
	</details>

	<h3>misc</h3>
	<details>
		<summary>I found a bug/something is broken. How do I report it?</summary>
		<p>
			If you have a GitHub account, feel free to report the issue on the <a
				href="https://github.com/Dilden/helth/issues">official repository</a
			>. Otherwise, send an email to
			<a href="mailto:support@helth.app?subject=helth app help">support@helth.app</a> with as much information
			as you can. Helpful information includes what device you were using, which version operating system
			is your device running, what browser was used, what street you grew up on, what your mother's maiden
			name is, what the last 4 digits of your social security number are, etc.
		</p>
	</details>
	<details>
		<summary>Is there a community of people who use helth.app?</summary>
		<p>
			As of now, not really. But we can start one together! I'm using GitHub to build this app and
			there is a Discussion page on the project repository where we can talk about it! See <a
				href="https://github.com/Dilden/helth/discussions"
				>https://github.com/Dilden/helth/discussions</a
			>. Of course, you will need a GitHub account to communicate there. If there seems to be enough
			interest, then I'd like to start a separate forum for community usage.
		</p>
	</details>
	<details>
		<summary>What is this app built with?</summary>
		<p>
			This app uses many technologies to function. It would <s>not be possible</s> have been significantly
			tougher to build without the following open-source projects:
		</p>
		<ul>
			<li>
				<a href="https://svelte.dev">Svelte</a> for compiling the templates and components used throughout
				the User Interface (UI)
			</li>
			<li>
				<a href="https://kit.svelte.dev/">SvelteKit</a> to handle routing and overall management of Svelte
				projects
			</li>
			<li>
				<a href="https://dexie.org">Dexie</a> to interface and manage the data store in
				<a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>
			</li>
			<li>
				<a href="https://www.chartjs.org/">Chart.js</a> to present trends in your historical data
			</li>
			<li><a href="https://github.com/zxing-js/library">zxing-js</a> for scanning barcodes</li>
			<li>
				<a href="https://vite-pwa-org.netlify.app/">Vite PWA</a> to make managing
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app#technical_features_of_pwas"
					>service workers and manifest</a
				> a breeze
			</li>
		</ul>
		<p>
			For even more information or to follow along with the development of the project, visit <a
				href="https://github.com/Dilden/helth">https://github.com/Dilden/helth</a
			>.
		</p>
	</details>
	<details>
		<summary>I like this project. How can I help make it better?</summary>
		<p>
			For real?! Ah, thanks so much. That means a lot to me. The first thing you can do is tell your
			friends, family, coworkers, acquaintances, and random people on the street about it.
		</p>
		<p>
			If you don't like talking to people or have no friends, there's a good chance you'll be more
			interested in the code. You can check out the <a href="https://github.com/Dilden/helth"
				>GitHub repository</a
			> for this project and make a contribution. There is a whole list of known bugs and features that
			still need to be built. Pull requests are welcome!
		</p>
		<p>
			If talking to people or writing code isn't your thing, then maybe philanthropy is. Donations,
			even the amount for a coffee or beer; tells me that you appreciate the work I've put into this
			app. If you donate to this project, I'll even feature your name here on this very page!
		</p>
		<p>
			To sponsor me on GitHub, visit <a href="https://github.com/sponsors/Dilden"
				>https://github.com/sponsors/Dilden</a
			>.
		</p>
	</details>
	<h3>changelog</h3>
	<p>You are running version {version}</p>
	<details>
		<summary>v1.0.11</summary>
		<ul class="list-disc">
			<li>upgrading various dependencies</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.10</summary>
		<ul class="list-disc">
			<li>Tailwind v4!</li>
			<li>Lots of inputs needed background colors added to them</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.9</summary>
		<ul class="list-disc">
			<li>Updated Dexie + Dexie Cloud + related dependencies</li>
			<li>If something broke, this was the update that did it (YOLO)</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.8</summary>
		<ul class="list-disc">
			<li>Updated TypeScript + related dependencies</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.7</summary>
		<ul class="list-disc">
			<li>
				Updated barcode scanning library to <a href="https://github.com/zxing-js/library/releases"
					>latest version</a
				>
			</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.6</summary>
		<ul class="list-disc">
			<li>Updated more dev dependencies</li>
			<li>Really, you shouldn't even notice anything different here but trust me bro...</li>
			<li>...it is different</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.5</summary>
		<ul class="list-disc">
			<li>Removed/mocked a dependency for testing</li>
			<li>Updated Vite + Svelte Vite plugin</li>
			<li>Default PR about release tagging</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.4</summary>
		<ul class="list-disc">
			<li>Fixed "Invalid Date" shown on charts</li>
			<li>Hid compiler warnings about state_referenced_locally</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.3</summary>
		<ul class="list-disc">
			<li>Addressed type errors in compiler</li>
			<li>Options for Counters were moved up slightly when clicking "..."</li>
			<li>Hid a non-relevant warning from the compiler</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.2</summary>
		<ul class="list-disc">
			<li>Miscellaneous formatting fixes of files</li>
			<li>Updated development dependencies</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.1</summary>
		<ul class="list-disc">
			<li>
				If a cloud sync error is encountered, show it on the /sync page so users can report it.
			</li>
		</ul>
	</details>
	<details>
		<summary>v1.0.0</summary>
		<ul class="list-disc">
			<li>Introducing Cloud Sync! Never lose your helth.app data again!</li>
			<li>Only cost $1 per month or $10 per year</li>
			<li>Your subscription supports the development of helth.app</li>
			<li>
				Cloud Sync is powered by <a href="https://dexie.org/cloud" target="_blank">Dexie Cloud</a>
			</li>
			<li>
				For an actual changelog, you're going to have to view the <a
					href="https://github.com/Dilden/helth/pull/242"
					target="_blank">PR on GitHub</a
				> b/c so many things changed.
			</li>
		</ul>
	</details>
	<details>
		<summary>Older versions</summary>
		<ul>
			<li>
				See the <a href="https://github.com/Dilden/helth/releases" target="_blank"
					>GitHub repository</a
				> for more information
			</li>
		</ul>
	</details>
</div>

<style>
	h2 {
		text-align: center;
	}
	h3 {
		border-top: var(--secondary-back-color) dotted 2px;
		padding-top: 0.5rem;
	}
	details {
		margin: 0 auto;
		max-width: 75%;
		padding: 0 1.3rem;
		margin: 0 auto;
		text-align: left;
		font-size: 1.3em;
	}
	details[open] > summary {
		background-color: #151f22;
	}
	summary {
		padding: 1rem 1.3rem;
	}
	details > p {
		padding-bottom: 0.75rem;
	}

	@media screen and (max-width: 900px) {
		details {
			max-width: 100%;
		}
	}
</style>
