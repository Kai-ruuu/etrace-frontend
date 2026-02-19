<script>
    const { title, children } = $props()
</script>

<div class="sticky top-0 flex items-center justify-between px-8 py-4 border-b border-b-gray-100 min-h-20 bg-white space-x-4 z-90">
    <p class="text-2xl text-red-800 text-left">{title}</p>
    {#if children}
        {@render children()}
    {/if}
</div>