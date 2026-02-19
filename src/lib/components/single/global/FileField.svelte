<script>
	import { X } from "lucide-svelte";

    let {
        accept,
        children,
        id = crypto.randomUUID(),
        label = null,
        value = $bindable(null),
        errors = [],
        required = true,
        placeholder = null,
        class: className = ""
    } = $props()
</script>

<div class={className}>
    <div class="flex items-start w-full space-x-3">
        <div class="flex flex-col items-stretch w-full space-x-3">
            {#if label}
                <span class="pb-1 text-sm">{label}</span>
            {/if}
            <label
                for={id}
                class="relative flex items-center w-full p-2 rounded-lg border-none bg-gray-100"
            >
                {#if value}
                    <span>{value.name}</span>
                {:else}
                    <span class="text-gray-400">{placeholder}</span>
                {/if}
                <input
                    {id}
                    {accept}
                    {required}
                    type="file"
                    class="hidden"
                    oninput={(e) => value = e.target.files[0] }
                >
            </label>
        </div>
        {#if children }
            <!-- preferrably action button -->
            {@render children()}
        {/if}
    </div>
    <ul class="pt-1">
        {#each errors as error }
            <li class="before:content-['•'] before:mr-2 before:text-red-800 text-sm text-red-800">{error}</li>
        {/each}
    </ul>
</div>