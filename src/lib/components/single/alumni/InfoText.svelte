<script>
    const {
        label = null,
        value = "",
    } = $props();
</script>

{#if value !== null}
    <div class="flex flex-col">
        {#if String(label).trim().length > 0}
            <span class="text-nowrap text-sm text-gray-500">{label}</span>
        {/if}
        <span>{value}</span>
    </div>
{/if}