<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { School } from "$lib/client/school";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import SystemAdminSchoolsList from "$lib/components/grouped/system-admin/SystemAdminSchoolsList.svelte";
	import AddSchoolModal from "$lib/components/single/system-admin/AddSchoolModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";

    let searchQuery = $state("")
    let schoolsInfo = $state({
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
    
    async function handleSchoolsFetching(query = undefined, archived = undefined) {
        schoolsInfo.loading = true
        const [status, data] = await School.searchSchools(
            query,
            archived,
            schoolsInfo.page,
            schoolsInfo.page_size
        )
        schoolsInfo.loading = false
        
        Object.assign(schoolsInfo, data)
    }
    
    async function handlePrevSchoolsFetching() {
        if (!schoolsInfo.has_prev) return
        
        schoolsInfo.loading = true
        const [status, data] = await School.searchSchools(
            searchQuery.length ? searchQuery : undefined,
            false,
            schoolsInfo.page - 1,
            schoolsInfo.page_size
        )
        schoolsInfo.loading = false
        
        Object.assign(schoolsInfo, data)
    }
            
    async function handleNextSchoolsFetching() {
        if (!schoolsInfo.has_next) return
                
        schoolsInfo.loading = true
        const [status, data] = await School.searchSchools(
            searchQuery.length ? searchQuery : undefined,
            false,
            schoolsInfo.page + 1,
            schoolsInfo.page_size
        )
        schoolsInfo.loading = false

        Object.assign(schoolsInfo, data)
    }

    async function handleSchoolsSearching() {
        schoolsInfo.page = 1;
        await handleSchoolsFetching(searchQuery, false);
    }

    async function handleSearchClearing() {
        schoolsInfo.page = 1;
        await handleSchoolsFetching(undefined, false);
    }

    async function handleSchoolsRefetching(prev = false) {
        if (prev && schoolsInfo.page > 1) schoolsInfo.page--

        await handleSchoolsFetching(undefined, false)
    }
    
    onMount(async () => await handleSchoolsFetching(undefined, false))
    $effect(() => { if (schoolsInfo.items.length === 0) schoolsInfo.page = 0 })
</script>

<PageHeader title="School Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add School</span>
    </Button>
</PageHeader>
<SystemAdminSchoolsList
    forArchived={false}
    {schoolsInfo}
    bind:searchQuery
    clearHandler={handleSearchClearing}
    searchHandler={handleSchoolsSearching}
    refetchHandler={handleSchoolsRefetching}
    fetchPrevHandler={handlePrevSchoolsFetching}
    fetchNextHandler={handleNextSchoolsFetching}
/>

{#if isAddModalOpen}
    <AddSchoolModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await handleSchoolsFetching(undefined, false)}
    />
{/if}