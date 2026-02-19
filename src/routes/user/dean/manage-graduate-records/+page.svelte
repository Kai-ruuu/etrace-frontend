<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { GraduateRecord } from "$lib/client/graduate_record";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import AddGraduateRecordModal from "$lib/components/single/dean/AddGraduateRecordModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import DeanGraduateRecordsList from "$lib/components/grouped/dean/DeanGraduateRecordsList.svelte";

    let searchQuery = $state("")
    let recordsInfo = $state({
        items: [],
        total: 0,
        total_pages: 0,
        page: 1,
        page_size: 20,
        has_next: false,
        has_prev: false,
        loading: false,
    })
    let isAddModalOpen = $state(false)
    
    async function fetchGraduateRecords(query = undefined, archived = undefined) {
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            query,
            archived,
            recordsInfo.page,
            recordsInfo.page_size
        )
        recordsInfo.loading = false
        
        Object.assign(recordsInfo, data)
    }
    
    async function fetchPrevGraduateRecords() {
        if (!recordsInfo.has_prev) return
        
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            searchQuery.length ? searchQuery : undefined,
            false,
            recordsInfo.page - 1,
            recordsInfo.page_size
        )
        recordsInfo.loading = false
        
        Object.assign(recordsInfo, data)
    }
            
    async function fetchNextGraduateRecords() {
        if (!recordsInfo.has_next) return
                
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            searchQuery.length ? searchQuery : undefined,
            false,
            recordsInfo.page + 1,
            recordsInfo.page_size
        )
        recordsInfo.loading = false

        Object.assign(recordsInfo, data)
    }

    onMount(async () => await fetchGraduateRecords(undefined, false))
    $effect(() => { if (recordsInfo.items.length === 0) recordsInfo.page = 0 })
</script>

<PageHeader title="Graduate Record Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add Graduate Record</span>
    </Button>
</PageHeader>
<DeanGraduateRecordsList
    forArchived={false}
    {recordsInfo}
    bind:searchQuery
    clearHandler={async () => {
        recordsInfo.page = 1
        await fetchGraduateRecords(undefined, false)
    }}
    searchHandler={async () => {
        recordsInfo.page = 1
        await fetchGraduateRecords(searchQuery, false)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && recordsInfo.page > 1) recordsInfo.page--

        await fetchGraduateRecords(undefined, false)
    }}
    fetchPrevHandler={fetchPrevGraduateRecords}
    fetchNextHandler={fetchNextGraduateRecords}
/>

{#if isAddModalOpen}
    <AddGraduateRecordModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await fetchGraduateRecords(undefined, false)}
    />
{/if}