<script>
    const { title, children } = $props()
</script>

<div class="flex items-center justify-between px-8 py-4 border-b border-b-gray-100 min-h-16 bg-white space-x-4">
    <p class="text-xl text-red-800 text-left">{title}</p>
    {#if children}
        {@render children()}
    {/if}
</div>