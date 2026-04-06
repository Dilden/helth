<script lang="typescript">
	import {PUBLIC_MONTHLY_PROD_ID, PUBLIC_ANNUAL_PROD_ID } from '$env/static/public';
</script>
<!-- Subscribe Form -->
<form method="POST" action="?/subscribe" class="flex flex-col gap-4">
	<fieldset class="flex w-auto flex-row justify-center gap-4">
		<div>
			<!-- Change Product Prices here -->
			<label for="monthly" class="text-md w-full p-2 md:text-xl">$1/month</label>
			<input
				type="radio"
				id="monthly"
				name="subscription"
				required
				value={PUBLIC_MONTHLY_PROD_ID}
				class="h-4 w-full border-none"
			/>
		</div>
		<div>
			<label for="annually" class="text-md w-full p-2 md:text-xl">$10/year</label>
			<input
				type="radio"
				id="annually"
				checked
				name="subscription"
				required
				value={PUBLIC_ANNUAL_PROD_ID}
				class="h-4 w-full border-none"
			/>
		</div>
	</fieldset>
	<button class="w-auto grow-0 p-5">Subscribe</button>
</form>
