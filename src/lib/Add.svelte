<script>
	import Barcode from '$lib/Barcode.svelte';
	import List from '$lib/items/List.svelte';
	import Modal from '$lib/Modal.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs.js';
	import { inventory, recipes } from '$stores/stores.svelte';
	import Spinner from '$lib/Spinner.svelte';
</script>

<Modal>
	<Tabs>
		<TabList>
			<Tab>Your Items</Tab>
			<Tab>Scan</Tab>
		</TabList>
		<TabPanel>
			{#await Promise.all([inventory.init(), recipes.init()])}
				<Spinner />
			{:then}
				<List />
			{/await}
		</TabPanel>
		<TabPanel>
			<Barcode />
		</TabPanel>
	</Tabs>
</Modal>
