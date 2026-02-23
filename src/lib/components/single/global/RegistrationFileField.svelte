<script>
    let {
        label,
        value = $bindable(null),
        accept = ".pdf"
    } = $props()

    const id = crypto.randomUUID()
</script>

<label
    for={id}
    class="flex items-center justify-between border-none bg-gray-100 rounded-full p-4 indent-2 relative"
>
    <div class="flex flex-col">
        <span>{label}</span>

        {#if value}
            <span class="text-xs">{value.name}</span>
        {/if}
    </div>
    <input
        type="file"
        onchange={e => {
            value = e.target.files?.[0] ?? null;
        }}
        {id}
        accept
        class="hidden"
    >
    <div
        class="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer pl-2 pr-4 py-1 rounded-lg bg-red-800 text-white text-sm flex items-center justify-center"
    >
        <span>Upload</span>
    </div>
</label>