<script>
	import { clickOutside } from '$utils/clickOutside';
	import meme from './meme.png';
	/** @type {{isOpen?: boolean}} */
	let { isOpen = $bindable(false) } = $props();
	const toggle = () => (isOpen = !isOpen);
	const links = [
		{
			href: '/',
			text: '🗒 track'
		},
		{
			href: '/charts',
			text: '📈 charts'
		},
		{
			href: '/timers',
			text: '⏰ timers'
		},
		{
			href: '/settings',
			text: '⚙️  settings'
		},
		{
			href: '/about',
			text: '❓ about'
		}
	];
</script>

<span use:clickOutside onclick_outside={() => (isOpen = false)}>
	<!-- // js-less button -->
	<input type="checkbox" id="menu-btn" bind:checked={isOpen} class="peer hidden" />
	<label
		for="menu-btn"
		title="Menu"
		aria-label="Menu"
		class="content-[' '] fixed right-0 top-0 z-[100] touch-manipulation rounded-bl-lg border-none bg-[var(--back-color)] p-8 text-left text-[var(--fore-color)] no-underline shadow-xl drop-shadow-lg transition-all duration-200 ease-in-out hover:rounded-bl-lg hover:bg-[var(--secondary-back-color)] peer-checked:right-64"
	>
		<span
			class="content-[' '] before:content-[' '] after:content-[' '] absolute right-3 top-[50%] block w-9 bg-[var(--fore-color)] p-[1px] transition-all duration-200 ease-in-out before:absolute before:right-0 before:top-2 before:block before:w-9 before:bg-[var(--fore-color)] before:p-[1px] before:transition-all before:duration-200 before:ease-in-out after:absolute after:bottom-2 after:right-0 after:block after:w-9 after:bg-[var(--fore-color)] after:p-[1px] after:transition-all after:duration-200 after:ease-in-out"
		></span>
	</label>

	<nav
		class="fixed right-[-16rem] top-0 z-[110] flex h-full min-w-64 flex-col justify-between bg-[var(--back-color)] transition-all duration-200 ease-in-out peer-checked:right-0 peer-checked:shadow-2xl"
	>
		<ul class="relative z-[130] m-0 list-none bg-[var(--back-color)] p-0 text-center">
			{#each links as { text, href }}
				<li class="m-0 p-0">
					<a
						class="m-0 block px-0 py-5 text-[var(--a-link-color)] no-underline transition-all duration-300 ease-in-out visited:text-[var(--a-link-color)] hover:bg-[var(--secondary-back-color)] hover:no-underline"
						{href}
						onclick={toggle}>{text}</a
					>
				</li>
			{/each}
		</ul>
		<span class="absolute bottom-0 right-0 z-[120] m-0 w-44 lg:w-52">
			<img
				src={meme}
				class="h-full w-full"
				alt="A 3D rendering of a bald and weirdly long face placed on a person wearing a lab coat with a stehoscope over his shoulders and stadning with his arms crossed."
				width="auto"
				height="auto"
			/>
		</span>
	</nav>
</span>

<style>
	#menu-btn:checked ~ label span {
		background: transparent;
		&:before {
			top: 0;
			rotate: 45deg;
		}
		&:after {
			bottom: 0;
			rotate: -45deg;
		}
	}
</style>
