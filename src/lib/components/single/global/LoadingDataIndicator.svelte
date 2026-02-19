<script>
    const { children } = $props()
</script>

<div class="w-full h-full flex items-center justify-center">
    <span>{@render children()}</span>
</div>