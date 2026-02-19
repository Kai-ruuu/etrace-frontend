<script>
    const {
        children,
        onclick,
        disabled = false,
        class: className = "",
    } = $props()
</script>

<button
    class={`cursor-pointer flex items-center space-x-2 bg-transparent} ${className}`}
    onclick={onclick}
>
    {@render children()}
</button>