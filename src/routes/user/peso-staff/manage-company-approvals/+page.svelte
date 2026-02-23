<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Company } from "$lib/client/company";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import PesoStaffCompaniesList from "$lib/components/grouped/peso-staff/PesoStaffCompaniesList.svelte";
	import ViewCompanyRequirementsModal from "$lib/components/single/peso-staff/ViewCompanyRequirementsModal.svelte";

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

    
    let requirementsInfo = $state(null);
    let isViewReqModalOpen = $state(false);
    
    async function handleCompaniesFetching(query = undefined) {
        companiesInfo.loading = true
        const [status, data] = await Company.searchCompanies(
            query,
            companiesInfo.page,
            companiesInfo.page_size
        )
        companiesInfo.loading = false

        console.log(data);
        
        Object.assign(companiesInfo, data)
    }
    
    async function handlePrevCompaniesFetching() {
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
            
    async function handleNextCompaniesFetching() {
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

    async function handleCompaniesSearching() {
        companiesInfo.page = 1;
        await handleCompaniesFetching(searchQuery, false);
    }
    
    async function handleSearchClearing() {
        companiesInfo.page = 1;
        await handleCompaniesFetching(undefined, false);
    }
    
    async function handleCompaniesRefetching(prev = false) {
        if (prev && companiesInfo.page > 1) companiesInfo.page--

        await handleCompaniesFetching(undefined, false)
    }
    
    onMount(async () => await handleCompaniesFetching(undefined))
    $effect(() => { if (companiesInfo.items.length === 0) companiesInfo.page = 0 })
</script>

<PageHeader title="Company Approval Management" />
<PesoStaffCompaniesList
    bind:searchQuery
    bind:requirementsInfo
    bind:isViewReqModalOpen
    {companiesInfo}
    clearHandler={handleSearchClearing}
    searchHandler={handleCompaniesSearching}
    refetchHandler={handleCompaniesRefetching}
    fetchPrevHandler={handlePrevCompaniesFetching}
    fetchNextHandler={handleNextCompaniesFetching}
/>

{#if isViewReqModalOpen}
    <ViewCompanyRequirementsModal
        bind:requirementsInfo
        exitHandler={() => isViewReqModalOpen = false}
    />
{/if}