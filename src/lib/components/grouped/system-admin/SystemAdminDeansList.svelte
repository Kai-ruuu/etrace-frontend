<script>
    import { Dean } from "$lib/client/dean";
	import { Archive, ArchiveRestore, CircleMinus, CirclePlus, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";

    let {
        searchQuery = $bindable(""),
        deansInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function disable(dean) {
        await Dean.disableById(dean.id)

        const pageIsEmpty = deansInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function enable(dean) {
        await Dean.enableById(dean.id)

        const pageIsEmpty = deansInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch grow relative">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Juan dela Cruz"
                class="w-full indent-3 rounded-lg bg-gray-100 border-none"
            >
            {#if String(searchQuery).trim().length}
                <TransparentButton
                    onclick={async () => {
                        searchQuery = ""
                        await searchHandler()
                    }}
                    title="Clear Search"
                    class="absolute right-2 top-[50%] translate-y-[-50%]"
                >
                    <X class="w-5" />
                </TransparentButton>
            {/if}
        </div>
        <Button onclick={searchHandler}>
            <Search class="w-5 text-white" />
            <span class="pr-2">Search</span>
        </Button>
    </div>
    <div class="overflow-x-hidden overflow-y-auto">
        {#if deansInfo.loading}
            <LoadingDataIndicator>Loading Deans...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">First</th>
                        <th class="text-left p-2">Middle</th>
                        <th class="text-left p-2">Last</th>
                        <th class="text-left p-2">Email</th>
                        <th class="text-left p-2">School</th>
                        <th class="text-left p-2">Status</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each deansInfo.items as dean}
                        <tr>
                            <td class="p-2">{dean.dean_profile.first_name}</td>
                            <td class="p-2">{dean.dean_profile.middle_name ? dean.dean_profile.middle_name : "-"}</td>
                            <td class="p-2">{dean.dean_profile.last_name}</td>
                            <td class="p-2">{dean.email}</td>
                            <td class="p-2">{dean.dean_profile.school.name}</td>
                            <td class={`p-2 ${dean.is_disabled ? "text-red-700" : "text-green-700"}`}>{dean.is_disabled ? "Disabled" : "Enabled"}</td>
                            <td class="p-2">
                                <Button
                                    variant="sm"
                                    onclick={async () => {
                                        if (dean.is_disabled) await enable(dean)
                                        else await disable(dean)
                                    }}
                                >
                                    {#if dean.is_disabled}
                                        <CirclePlus class="w-4 text-white" />
                                    {:else}
                                        <CircleMinus class="w-4 text-white" />
                                    {/if}
                                    <span class="pr-2">{dean.is_disabled ? "Enable" : "Disable"}</span>
                                </Button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={deansInfo} />