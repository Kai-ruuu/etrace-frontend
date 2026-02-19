<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Alumni } from "$lib/client/alumni";
	import { approvalStatus } from "$lib/constants/user";
	import Button from "$lib/components/single/global/Button.svelte";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import DeanAlumniList from "$lib/components/grouped/dean/DeanAlumniList.svelte";
	import ViewAlumniProfileModal from "$lib/components/single/dean/ViewAlumniProfileModal.svelte";

    let _status = $state(approvalStatus.PENDING)
    let searchQuery = $state("")
    let alumniInfo = $state({
        items: [],
        total: 0,
        total_pages: 0,
        page: 1,
        page_size: 20,
        has_next: false,
        has_prev: false,
        loading: false,
    })

    let viewAlumniId = $state(null)
    let isViewModalOpen = $state(false)
    
    async function fetchAlumni(query = undefined, _status) {
        alumniInfo.loading = true
        const [status, data] = await Alumni.searchAlumni(
            query,
            _status,
            alumniInfo.page,
            alumniInfo.page_size
        )
        alumniInfo.loading = false
        
        Object.assign(alumniInfo, data)
    }
    
    async function fetchPrevAlumni() {
        if (!alumniInfo.has_prev) return
        
        alumniInfo.loading = true
        const [status, data] = await Alumni.searchAlumni(
            searchQuery.length ? searchQuery : undefined,
            _status,
            alumniInfo.page - 1,
            alumniInfo.page_size
        )
        alumniInfo.loading = false
        
        Object.assign(alumniInfo, data)
    }
            
    async function fetchNextAlumni() {
        if (!alumniInfo.has_next) return
                
        alumniInfo.loading = true
        const [status, data] = await Alumni.searchAlumni(
            searchQuery.length ? searchQuery : undefined,
            _status,
            alumniInfo.page + 1,
            alumniInfo.page_size
        )
        alumniInfo.loading = false

        Object.assign(alumniInfo, data)
    }

    onMount(async () => await fetchAlumni(undefined, _status))
</script>

<PageHeader title="Alumni Approval Management" />
<DeanAlumniList
    bind:_status
    bind:searchQuery
    bind:viewAlumniId
    bind:isViewModalOpen
    {alumniInfo}
    fetchPrevHandler={fetchPrevAlumni}
    fetchNextHandler={fetchNextAlumni}
    clearHandler={async () => {
        alumniInfo.page = 1
        await fetchAlumni(undefined, _status)
    }}
    searchHandler={async () => {
        alumniInfo.page = 1
        await fetchAlumni(searchQuery, _status)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && alumniInfo.page > 1) alumniInfo.page--

        await fetchAlumni(undefined, _status)
    }}
/>

{#if isViewModalOpen}
    <ViewAlumniProfileModal
        bind:viewAlumniId
        exitHandler={() => {
            viewAlumniId = null
            isViewModalOpen = false
        }}
    />
{/if}