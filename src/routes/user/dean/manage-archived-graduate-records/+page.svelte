<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { GraduateRecord } from "$lib/client/graduate_record";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
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
            true,
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
            true,
            recordsInfo.page + 1,
            recordsInfo.page_size
        )
        recordsInfo.loading = false

        Object.assign(recordsInfo, data)
    }

    onMount(async () => await fetchGraduateRecords(undefined, true))
    $effect(() => { if (recordsInfo.items.length === 0) recordsInfo.page = 0 })
</script>

<PageHeader title="Archived Graduate Record Management" />
<DeanGraduateRecordsList
    forArchived={true}
    {recordsInfo}
    bind:searchQuery
    clearHandler={async () => {
        recordsInfo.page = 1
        await fetchGraduateRecords(undefined, true)
    }}
    searchHandler={async () => {
        recordsInfo.page = 1
        await fetchGraduateRecords(searchQuery, true)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && recordsInfo.page > 1) recordsInfo.page--

        await fetchGraduateRecords(undefined, true)
    }}
    fetchPrevHandler={fetchPrevGraduateRecords}
    fetchNextHandler={fetchNextGraduateRecords}
/>
