<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Company } from "$lib/client/company";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import SystemAdminCompaniesList from "$lib/components/grouped/system-admin/SystemAdminCompaniesList.svelte";

    let searchQuery = $state("")
    let companiesInfo = $state({
        items: [],
        total: 0,
        total_pages: 0,
        page: 1,
        page_size: 20,
        has_next: false,
        has_prev: false,
        loading: false,
    })
    
    async function fetchCompanies(query = undefined) {
        companiesInfo.loading = true
        const [status, data] = await Company.searchCompanies(
            query,
            companiesInfo.page,
            companiesInfo.page_size
        )
        companiesInfo.loading = false
        
        Object.assign(companiesInfo, data)
    }
    
    async function fetchPrevCompanies() {
        if (!companiesInfo.has_prev) return
        
        companiesInfo.loading = true
        const [status, data] = await Company.searchCompanies(
            searchQuery.length ? searchQuery : undefined,
            false,
            companiesInfo.page - 1,
            companiesInfo.page_size
        )
        companiesInfo.loading = false
        
        Object.assign(companiesInfo, data)
    }
            
    async function fetchNextCompanies() {
        if (!companiesInfo.has_next) return
                
        companiesInfo.loading = true
        const [status, data] = await Company.searchCompanies(
            searchQuery.length ? searchQuery : undefined,
            false,
            companiesInfo.page + 1,
            companiesInfo.page_size
        )
        companiesInfo.loading = false

        Object.assign(companiesInfo, data)
    }

    onMount(async () => await fetchCompanies(undefined))
    $effect(() => { if (companiesInfo.items.length === 0) companiesInfo.page = 0 })
</script>

<PageHeader title="Company Approval Management" />
<SystemAdminCompaniesList
    bind:searchQuery
    {companiesInfo}
    fetchPrevHandler={fetchPrevCompanies}
    fetchNextHandler={fetchNextCompanies}
    clearHandler={async () => {
        companiesInfo.page = 1
        await fetchCompanies(undefined, false)
    }}
    searchHandler={async () => {
        companiesInfo.page = 1
        await fetchCompanies(searchQuery, false)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && companiesInfo.page > 1) companiesInfo.page--

        await fetchCompanies(undefined, false)
    }}
/>