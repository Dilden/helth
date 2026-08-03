<script lang="ts">
	/** @type {{nutrient: Nutrient}} */
	let { nutrient } = $props();
</script>

<li class="mx-2 my-0 text-xs inline-block italic">
	{nutrient.name}: {nutrient.quantity}{nutrient.unit}
</li>
