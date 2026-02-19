<script>
    import Papa from "papaparse";
	import { GraduateRecord } from "$lib/client/graduate_record";
	import { Archive, ArchiveRestore, Eye, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingAnimation from "$lib/components/single/global/LoadingAnimation.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";
	import { onMount } from "svelte";

    let {
        forArchived,
        searchQuery = $bindable(""),
        recordsInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler,
        filterCourses = $bindable([]),
        filterCourseId = $bindable(null),
        isFilterCoursesReady = $bindable(false),
        isRecordOpen = $bindable(false),
        recordFileName = $bindable(null),
    } = $props()
    
    let recordContents = $state(null);
    
    let filteredAlumni = $derived(
        recordContents.data !== undefined
            ? recordContents.data.filter((alumni) => {
                return (
                    String(alumni["full name"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["first name"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["middle name"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["last name"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["birthday"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["birthplace"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["gender"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["student number"]).toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                    String(alumni["contact number"]).toLowerCase().includes(searchQuery.trim().toLowerCase())
                );
            })
            : []
    )

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

    async function handleRecordOpening(filename) {
        const [status, data] = await GraduateRecord.getContents(filename);

        if (status === 200) {
            recordContents = Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
            });

            isRecordOpen = true;
            recordFileName = filename;

            console.log(recordContents);
        } else {
            alert("Unable to fetch record contents.");
        }
    }
    
    function highlight(text, query) {
        if (!query.trim() || !query) {
            return text;
        }

        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');

        return text.replace(regex, '<span class="text-red-800 font-bold">$1</span>');
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch space-x-3 grow relative">
            <!-- course filter selection -->
            {#if !isRecordOpen}
                <select
                    bind:value={filterCourseId}
                    onchange={async () => await searchHandler()}
                    class="rounded-lg border-none bg-gray-100"
                >
                    {#if filterCourses}
                        {#each filterCourses as course}
                            <option value={course.id}>{course.name}</option>
                        {/each}
                    {/if}
                </select>
            {/if}
            
            <!-- search box -->
            <input
                bind:value={searchQuery}
                type="text"
                placeholder={isRecordOpen ? "Search Student Information" : "Search Graduate Records"}
                class="w-full indent-3 rounded-lg bg-gray-100 border-none"
            >
            {#if String(searchQuery).trim().length}
                <TransparentButton
                    onclick={async () => {
                        searchQuery = "";

                        if (isRecordOpen) {
                            
                        } else {
                            await searchHandler();
                        }
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
    <div class="overflow-auto">
        {#if recordsInfo.loading}
            <LoadingDataIndicator>Loading Records...</LoadingDataIndicator>
        {:else}
            {#if isRecordOpen}
                <table>
                    <thead>
                        <tr>
                            <th class="text-left text-nowrap p-2">Full Name</th>
                            <th class="text-left text-nowrap p-2">First Name</th>
                            <th class="text-left text-nowrap p-2">Middle Name</th>
                            <th class="text-left text-nowrap p-2">Last Name</th>
                            <th class="text-left text-nowrap p-2">Birthday</th>
                            <th class="text-left text-nowrap p-2">Birthplace</th>
                            <th class="text-left text-nowrap p-2">Gender</th>
                            <th class="text-left text-nowrap p-2">Student Number</th>
                            <th class="text-left text-nowrap p-2">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filteredAlumni as alumni}
                            <tr>
                                <td class="text-nowrap p-2">{@html highlight(alumni["full name"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["first name"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["middle name"] ? alumni["middle name"] : "-", searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["last name"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["birthday"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["birthplace"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["gender"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["student number"], searchQuery)}</td>
                                <td class="text-nowrap p-2">{@html highlight(alumni["contact number"], searchQuery)}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
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
                                        onclick={async () => await handleRecordOpening(record.record_filename)}
                                    >
                                        <Eye class="w-4 text-white" />
                                        <span class="pr-1">View</span>
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
        {/if}
    </div>
</div>

{#if !isRecordOpen}
    <Paginator {fetchPrevHandler} {fetchNextHandler} info={recordsInfo} />
{/if}