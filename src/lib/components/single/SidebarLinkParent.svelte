<script>
    import { ChevronDown, ChevronUp } from "lucide-svelte";
    
    const { children, label, Icon } = $props()

    let collapsed = $state(true)
</script>

<div class="flex flex-col items-stretch text-left">
    <button
        onclick={() => collapsed = !collapsed}
        class="py-3 pl-4 cursor-pointer flex items-center justify-between"
    >
        <div class="flex">
            <Icon class="w-5" />
            <p class="pl-4">{label}</p>
        </div>
        {#if collapsed}
            <ChevronUp class="w-5"/>
        {:else}
            <ChevronDown class="w-5"/>
        {/if}
    </button>
    {#if collapsed}
        <div class="flex flex-col items-stretch pl-4">
            {@render children()}
        </div>
    {/if}
</div>