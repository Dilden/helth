<script>
	import { settings, limits, goals } from '$stores/stores';
	import ExportData from '$lib/data/ExportData.svelte';
	import ImportData from '$lib/data/ImportData.svelte';
	import Spinner from '$lib/Spinner.svelte';
</script>

<div class="p-7 text-center">
	<h2>⚙️ settings</h2>
	{#await Promise.all([settings.init(), limits.init(), goals.init()])}
		<Spinner />
	{:then}
		<h3>🏅goals and limits</h3>
		sgolkdfj
	{/await}
	<h3>💾 data</h3>
	<div class="mx-auto my-6"><ExportData /></div>
	<div><ImportData /></div>
</div>
