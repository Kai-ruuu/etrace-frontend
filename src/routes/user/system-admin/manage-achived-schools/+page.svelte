<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { School } from "$lib/client/school";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import SystemAdminSchoolsList from "$lib/components/grouped/system-admin/SystemAdminSchoolsList.svelte";
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
    
    async function fetchSchools(query = undefined, archived = undefined) {
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

    async function fetchPrevSchools() {
        if (!schoolsInfo.has_prev) return
        
        schoolsInfo.loading = true
        const [status, data] = await School.searchSchools(
            searchQuery.length ? searchQuery : undefined,
            true,
            schoolsInfo.page - 1,
            schoolsInfo.page_size
        )
        schoolsInfo.loading = false
        
        Object.assign(schoolsInfo, data)
    }
            
    async function fetchNextSchools() {page_size
        if (!schoolsInfo.has_next) return
                
        schoolsInfo.loading = true
        const [status, data] = await School.searchSchools(
            searchQuery.length ? searchQuery : undefined,
            true,
            schoolsInfo.page + 1,
            schoolsInfo.pageSize
        )
        schoolsInfo.loading = false

        Object.assign(schoolsInfo, data)
    }
    
    onMount(async () => await fetchSchools(undefined, true))
    $effect(() => { if (schoolsInfo.items.length === 0) schoolsInfo.page = 0 })
</script>

<PageHeader title="Archived School Management" />
<SystemAdminSchoolsList
    forArchived={true}
    {schoolsInfo}
    bind:searchQuery
    clearHandler={async () => {
        schoolsInfo.page = 1
        await fetchSchools(undefined, true)
    }}
    searchHandler={async () => {
        schoolsInfo.page = 1
        await fetchSchools(searchQuery, true)
    }}
    refetchHandler={async (prev) => {
        if (prev && schoolsInfo.page > 1) schoolsInfo.page--
        
        await fetchSchools(undefined, true)
    }}
/>