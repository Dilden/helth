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
			href: '/sync',
			text: '☁️  sync'
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
		class="content-[' '] right-0 top-0 rounded-bl-lg p-8 shadow-xl drop-shadow-lg ease-in-out hover:rounded-bl-lg peer-checked:right-64 fixed z-[100] touch-manipulation border-none bg-[var(--back-color)] text-left text-[var(--fore-color)] no-underline transition-all duration-200 hover:bg-[var(--secondary-back-color)]"
	>
		<span
			class="content-[' '] before:content-[' '] after:content-[' '] right-3 w-9 ease-in-out before:right-0 before:top-2 before:w-9 before:ease-in-out after:bottom-2 after:right-0 after:w-9 after:ease-in-out absolute top-[50%] block bg-[var(--fore-color)] p-[1px] transition-all duration-200 before:absolute before:block before:bg-[var(--fore-color)] before:p-[1px] before:transition-all before:duration-200 after:absolute after:block after:bg-[var(--fore-color)] after:p-[1px] after:transition-all after:duration-200"
		></span>
	</label>

	<nav
		class="top-0 min-w-64 ease-in-out peer-checked:right-0 peer-checked:shadow-2xl fixed right-[-16rem] z-[110] flex h-full flex-col justify-between bg-[var(--back-color)] transition-all duration-200"
	>
		<ul class="m-0 p-0 relative z-[130] list-none bg-[var(--back-color)] text-center">
			{#each links as { text, href }}
				<li class="m-0 p-0">
					<a
						class="m-0 px-0 py-5 ease-in-out block text-[var(--a-link-color)] no-underline transition-all duration-300 visited:text-[var(--a-link-color)] hover:bg-[var(--secondary-back-color)] hover:no-underline"
						{href}
						onclick={toggle}>{text}</a
					>
				</li>
			{/each}
		</ul>
		<span class="bottom-0 right-0 m-0 w-44 lg:w-52 absolute z-[120]">
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
