<script>
    import Papa from "papaparse";
	import { GraduateRecord } from "$lib/client/graduate_record";
	import { Archive, ArchiveRestore, Eye, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingAnimation from "$lib/components/single/global/LoadingAnimation.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";

    let {
        forArchived,
        searchQuery = $bindable(""),
        recordsInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    let recordContents = $state(null);

    async function archive(record) {
        await GraduateRecord.archiveById(record.id)

        const pageIsEmpty = recordsInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
    
    async function restore(record) {
        await GraduateRecord.restoreById(record.id)

        const pageIsEmpty = recordsInfo.items.length - 1 === 0

        await refetchHandler(pageIsEmpty)
    }

    async function handleGetContents(filename) {
        const [status, data] = await GraduateRecord.getContents(filename);

        if (status === 200) {
            recordContents = Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            });

            console.log(recordContents);
        } else {
            alert("Unable to fetch record contents.");
        }
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch grow relative">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Search Graduate Records"
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
        {#if recordsInfo.loading}
            <LoadingDataIndicator>Loading Records...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">Name</th>
                        <th class="text-left p-2">Gradutation Year</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each recordsInfo.items as record}
                        <tr>
                            <td class="p-2">{record.record_filename}</td>
                            <td class="p-2">{record.graduation_year}</td>
                            <td class="p-2 flex items-center space-x-3">
                                <Button
                                    variant="sm"
                                    onclick={async () => await handleGetContents(record.record_filename)}
                                >
                                    <Eye class="w-4 text-white" />
                                    <span class="pr-1">Open</span>
                                </Button>
                                <Button
                                    variant="sm"
                                    onclick={async () => {
                                        if (forArchived) await restore(record)
                                        else await archive(record)
                                    }}
                                >
                                    {#if forArchived}
                                        <ArchiveRestore class="w-4 text-white" />
                                    {:else}
                                        <Archive class="w-4 text-white" />
                                    {/if}
                                    <span class="pr-1">{forArchived ? "Restore" : "Archive"}</span>
                                </Button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={recordsInfo} />