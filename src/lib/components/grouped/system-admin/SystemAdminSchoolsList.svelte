<script>
	import { School } from "$lib/client/school";
	import { Archive, ArchiveRestore, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingAnimation from "$lib/components/single/global/LoadingAnimation.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";

    let {
        forArchived,
        searchQuery = $bindable(""),
        schoolsInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function archive(school) {
        await School.archiveById(school.id)

        const pageIsEmpty = schoolsInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
    
    async function restore(school) {
        await School.restoreById(school.id)

        const pageIsEmpty = schoolsInfo.items.length - 1 === 0

        await refetchHandler(pageIsEmpty)
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch grow relative">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="School of Computer Studies"
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
        {#if schoolsInfo.loading}
            <LoadingDataIndicator>Loading Schools...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">Name</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each schoolsInfo.items as school}
                        <tr>
                            <td class="p-2">{school.name}</td>
                            <td class="p-2">
                                <Button
                                    variant="sm"
                                    onclick={async () => {
                                        if (forArchived) await restore(school)
                                        else await archive(school)
                                    }}
                                >
                                    {#if forArchived}
                                        <ArchiveRestore class="w-4 text-white" />
                                    {:else}
                                        <Archive class="w-4 text-white" />
                                    {/if}
                                    <span class="pr-2">{forArchived ? "Restore" : "Archive"}</span>
                                </Button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={schoolsInfo} />