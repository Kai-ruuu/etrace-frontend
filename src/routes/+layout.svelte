<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="w-screen h-screen overflow-x-hidden overflow-y-auto">
	{@render children()}
</div>
