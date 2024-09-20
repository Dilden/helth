<script>
	import { BrowserMultiFormatReader } from '@zxing/library';
	import { getInventory, addInventory } from '$stores/db';
	import { today } from '$stores/stores';
	import { successToast, errorToast, confirmDialog } from '$utils/toast.js';
	import { error } from '@sveltejs/kit';
	import { getFoodFacts } from '$utils/sources';

	// scanner
	let selected;

	const codeReader = new BrowserMultiFormatReader();

	async function scan() {
		codeReader
			.decodeOnceFromVideoDevice(selected.deviceId, 'scanner')
			.then((result) => getFoodFacts(result.getText()))
			.then((val) => {
				if (val.nutrients.length === 0 || !val.name) {
					errorToast('Item not found');
					error(404, val.message ? `${val.message}` : 'Could not add item');
				}
				getInventory().then((data) => {
					if (!data.map((item) => item.barcode).includes(val.barcode)) {
						addInventory(val)
							.then(() => successToast('Item added to inventory!'))
							.catch(() => errorToast('Error saving item to inventory!'));
					} else {
						confirmDialog(
							'An item with that barcode already exists in your inventory. Add to your daily total?',
							() => addToToday(data.find((item) => item.barcode === val.barcode).nutrients),
							() => false
						);
					}
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => codeReader.reset());
	}

	const addToToday = (data) => {
		try {
			data.map(({ key, quantity }) => {
				$today[key] += Number(quantity);
			});
			successToast('Added item to daily total!');
		} catch (e) {
			errorToast('Error adding item to daily total');
		}
	};

	function cancel() {
		codeReader.reset();
	}
</script>

<div class="grid-rows-[2fr .5fr .5fr] grid min-h-full gap-x-20 gap-y-5 p-0">
	{#await codeReader.listVideoInputDevices()}
		<p>..waiting</p>
	{:then inputs}
		<div class="row-start-2 row-end-3 grid grid-cols-6 grid-rows-3 gap-y-3 text-center uppercase">
			<label for="inputs" class="col-start-2 col-end-6 row-start-1 row-end-1 text-xl"
				>Select device</label
			>
			<select
				id="inputs"
				name="inputs"
				class="col-start-2 col-end-6 row-start-2 row-end-2 border border-solid border-gray-500"
				bind:value={selected}
				on:change={() => scan()}
			>
				{#each inputs as input}
					<option value={input}>{input.label}</option>
				{/each}
			</select>
			<div class="col-start-2 col-end-6 grid grid-cols-2 grid-rows-1 gap-x-5">
				<button class="col-start-1 col-end-2" on:click={cancel}>❌ STOP</button>
				<button class="col-start-2 col-end-3" on:click={scan}>📷 SCAN</button>
			</div>
		</div>
	{:catch error}
		<p class=".error">
			An error occurred when attempting to connect to your video input devices. Please contact the
			developer with the following error information: {error}
		</p>
	{/await}
	<video id="scanner" name="scanner" class="row-start-1 row-end-2 max-h-[60vh] w-full object-cover"
		><track kind="captions" /></video
	>
	<div></div>
</div>
