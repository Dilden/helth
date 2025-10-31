<!-- Subscribe Form -->
<form method="POST" action="?/subscribe" class="flex flex-col gap-4">
	<fieldset class="flex w-auto flex-row justify-center gap-4">
		<div>
			<!-- Change Product Prices here -->
			<label for="monthly" class="w-full p-2 text-xl">$1/month</label>
			<input
				type="radio"
				id="monthly"
				name="subscription"
				required
				value="price_1RjPaSFMCuO7ieQRwVIt9aWt"
				class="h-4 w-full border-none"
			/>
		</div>
		<div>
			<label for="annually" class="w-full text-xl">$10/year</label>
			<input
				type="radio"
				id="annually"
				checked
				name="subscription"
				required
				value="price_1RjPaSFMCuO7ieQRf3E5RX02"
				class="h-4 w-full border-none"
			/>
		</div>
	</fieldset>
	<button class="w-auto grow-0 p-5">Subscribe</button>
</form>
