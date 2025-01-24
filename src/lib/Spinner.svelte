<script lang="ts">
	interface Props {
		// source: https://github.com/thetrisatria/svelte-loading-animation/blob/master/src/Spinner.svelte
		size?: string;
		color?: string;
	}

	let { size = '64px', color = '#26B170' }: Props = $props();
</script>

<div class="mx-auto">
	<div class="spinner" style="--size:{size};--color:{color}">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>

<style>
	.spinner {
		display: inline-flex;
		position: relative;
		width: var(--size);
		height: var(--size);
	}
	.spinner div {
		transform-origin: calc(var(--size) * 0.5) calc(var(--size) * 0.5);
		animation: spinner 1.2s linear infinite;
	}
	.spinner div:after {
		content: ' ';
		display: block;
		position: absolute;
		top: calc(var(--size) * 0.0375);
		left: calc(var(--size) * 0.4625);
		width: calc(var(--size) * 0.075);
		height: calc(var(--size) * 0.225);
		border-radius: 20%;
		background: var(--color);
	}
	.spinner div:nth-child(1) {
		transform: rotate(0deg);
		animation-delay: -1.1s;
	}
	.spinner div:nth-child(2) {
		transform: rotate(30deg);
		animation-delay: -1s;
	}
	.spinner div:nth-child(3) {
		transform: rotate(60deg);
		animation-delay: -0.9s;
	}
	.spinner div:nth-child(4) {
		transform: rotate(90deg);
		animation-delay: -0.8s;
	}
	.spinner div:nth-child(5) {
		transform: rotate(120deg);
		animation-delay: -0.7s;
	}
	.spinner div:nth-child(6) {
		transform: rotate(150deg);
		animation-delay: -0.6s;
	}
	.spinner div:nth-child(7) {
		transform: rotate(180deg);
		animation-delay: -0.5s;
	}
	.spinner div:nth-child(8) {
		transform: rotate(210deg);
		animation-delay: -0.4s;
	}
	.spinner div:nth-child(9) {
		transform: rotate(240deg);
		animation-delay: -0.3s;
	}
	.spinner div:nth-child(10) {
		transform: rotate(270deg);
		animation-delay: -0.2s;
	}
	.spinner div:nth-child(11) {
		transform: rotate(300deg);
		animation-delay: -0.1s;
	}
	.spinner div:nth-child(12) {
		transform: rotate(330deg);
		animation-delay: 0s;
	}
	@keyframes spinner {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
