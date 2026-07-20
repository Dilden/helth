<script>
	import Barcode from '$lib/Barcode.svelte';
	import List from '$lib/recipes/List.svelte';
	import Modal from '$lib/Modal.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs.js';
</script>

<Modal>
	<Tabs>
		<TabList>
			<Tab>Inventory + Recipes</Tab>
			<Tab>Scan</Tab>
		</TabList>
		<TabPanel>
			<Inventory />
		</TabPanel>
		<TabPanel>
			<Recipes />
		</TabPanel>
		<TabPanel>
			<Barcode />
		</TabPanel>
	</Tabs>
</Modal>
