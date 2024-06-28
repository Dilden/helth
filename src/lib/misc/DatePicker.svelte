<script>
	export let callback = () => {};
	const dateObj = new Date();
	const month = dateObj.getMonth() + 1;
	export let value =
		dateObj.getFullYear() +
		'-' +
		(month.toString().length == 1 ? '0' + month : month) +
		'-' +
		dateObj.getDate();
</script>

<label for="entry-date">Select date</label>
<input name="entry-date" id="entry-date" type="date" on:change={callback} {value} max={value} />
