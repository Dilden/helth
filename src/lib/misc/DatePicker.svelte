<script>
	import { dateToPicker } from '$utils/dates';
	export let callback = () => {};
	const dateObj = new Date();
	export let value = dateToPicker(dateObj);
</script>

<label for="entry-date">Select date</label>
<input name="entry-date" id="entry-date" type="date" on:change={callback} {value} max={value} />
