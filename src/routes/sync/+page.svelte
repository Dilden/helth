<script lang="ts">
	// import type { DXCUserInteraction } from 'dexie-cloud-addon';
	// import type { Observable } from 'dexie';

	// let { ui }: { ui: Observable<DXCUserInteraction> } = $props();
	let email = $state('');
	let msg = $state('');

	const onsubmit = (event: SubmitEvent) => {
		event.preventDefault();
		msg = 'Click the link in your email!';

		// if ($ui) {
		// $ui.onSubmit({ email });
		// }
	};
</script>

<div class="p-7 text-center">
	<h2>☁ sync</h2>

	{#if msg}
		<p class="bg-green-200 p-2 text-black">Click the link in your email!</p>
	{/if}

	<form {onsubmit} class="mx-auto flex w-3/6 flex-col" name="Email-Sync">
		<label class="px-3 py-2" for="email">Email</label>
		<input
			type="email"
			bind:value={email}
			required
			class="text-slate-800"
			id="email"
			name="email"
		/>
		<button
			type="submit"
			data-text="Submit"
			class="relative my-4 px-3 py-2 transition duration-200 hover:bg-[var(--secondary-back-color)] hover:text-[var(--link-hover-color)]"
			>Submit</button
		>
	</form>
</div>
