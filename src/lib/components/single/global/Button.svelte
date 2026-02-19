<script>
    const {
        children,
        onclick,
        disabled = false,
        variant = "md",
        class: className = "",
    } = $props()
</script>

{#if variant === "md"}
    <button
        class={`cursor-pointer text-white px-4 py-2 rounded-lg flex items-center justify-center ${disabled ? "bg-gray-400" : "bg-red-800"} ${className}`}
        onclick={onclick}
    >
        <div class="flex items-center space-x-1">{@render children()}</div>
    </button>
{:else }
    <button
        class={`cursor-pointer text-white px-2 py-1 rounded-lg flex items-center justify-center ${disabled ? "bg-gray-400" : "bg-red-800"} ${className}`}
        onclick={onclick}
    >
        <div class="flex items-center space-x-1 text-sm">{@render children()}</div>
    </button>
{/if}