<script lang="typescript">
	import { PUBLIC_MONTHLY_PROD_ID, PUBLIC_ANNUAL_PROD_ID } from '$env/static/public';
</script>

<!-- Subscribe Form -->
<form method="POST" action="?/subscribe" class="gap-4 flex flex-col">
	<fieldset class="gap-4 flex w-auto flex-row justify-center">
		<div class="text-center">
			<!-- Change Product Prices here -->
			<label for="monthly" class="text-md p-2 md:text-xl w-full">$1/month</label>
			<input
				type="radio"
				id="monthly"
				name="subscription"
				required
				value={PUBLIC_MONTHLY_PROD_ID}
				class="h-4 w-full border-none"
			/>
		</div>
		<div class="text-center">
			<label for="annually" class="text-md p-2 md:text-xl w-full">$10/year</label>
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
	<button class="p-5 w-auto grow-0">Subscribe</button>
</form>
