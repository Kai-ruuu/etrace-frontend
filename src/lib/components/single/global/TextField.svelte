<script>
	import { X } from "lucide-svelte";

    let {
        children,
        id = crypto.randomUUID(),
        label = null,
        type = "text",
        value = $bindable(""),
        errors = [],
        allowClear = true,
        required = true,
        placeholder = null,
        class: className = ""
    } = $props()
</script>

<div class={className}>
    <div class="flex items-start w-full space-x-3">
        <div class="flex flex-col items-stretch w-full space-x-3">
            {#if label}
                <label
                    for={id}
                    class="pb-1 text-sm"
                >
                    {label}
                </label>
            {/if}
            <dir class="relative flex items-center w-full grow">
                <input
                    {id}
                    {required}
                    bind:value={value}
                    type={type} {placeholder}
                    class="w-full p-2 rounded-lg border-none bg-gray-100"
                >
                {#if String(value).trim().length > 0 && allowClear}
                    <button
                        onclick={() => value = ""}
                        class="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer"
                    >
                        <X class="w-5" />
                    </button>
                {/if}
            </dir>
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