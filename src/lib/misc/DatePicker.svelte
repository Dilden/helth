<script>
	import { dateToPicker } from '$utils/dates';
	const dateObj = new Date();
	/** @type {{callback?: any, value?: any}} */
	let { callback = () => {}, value = dateToPicker(dateObj) } = $props();
</script>

<label for="entry-date">Select date</label>
<input
	class="bg-slate-100"
	name="entry-date"
	id="entry-date"
	type="date"
	onchange={callback}
	{value}
	max={value}
/>
