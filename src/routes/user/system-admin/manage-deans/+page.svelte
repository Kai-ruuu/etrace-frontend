<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Dean } from "$lib/client/dean";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import AddDeanModal from "$lib/components/single/system-admin/AddDeanModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import SystemAdminDeansList from "$lib/components/grouped/system-admin/SystemAdminDeansList.svelte";

    let searchQuery = $state("")
    let deansInfo = $state({
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
    
    async function handleDeansFetching(query = undefined) {
        deansInfo.loading = true
        const [status, data] = await Dean.searchDeans(
            query,
            deansInfo.page,
            deansInfo.page_size
        )
        deansInfo.loading = false
        
        Object.assign(deansInfo, data)
    }
    
    async function handlePrevDeansFetching() {
        if (!deansInfo.has_prev) return
        
        deansInfo.loading = true
        const [status, data] = await Dean.searchDeans(
            searchQuery.length ? searchQuery : undefined,
            false,
            deansInfo.page - 1,
            deansInfo.page_size
        )
        deansInfo.loading = false
        
        Object.assign(deansInfo, data)
    }
            
    async function handleNextDeansFetching() {
        if (!deansInfo.has_next) return
                
        deansInfo.loading = true
        const [status, data] = await Dean.searchDeans(
            searchQuery.length ? searchQuery : undefined,
            false,
            deansInfo.page + 1,
            deansInfo.page_size
        )
        deansInfo.loading = false

        Object.assign(deansInfo, data)
    }

    async function handleDeansSearching() {
        deansInfo.page = 1;
        await handleDeansFetching(searchQuery, false);
    }
    
    async function handleSearchClearing() {
        deansInfo.page = 1;
        await handleDeansFetching(undefined, false);
    }

    async function handleDeansRefetching(prev = false) {
        if (prev && deansInfo.page > 1) deansInfo.page--

        await handleDeansFetching(undefined, false)
    }

    onMount(async () => await handleDeansFetching(undefined))
    $effect(() => { if (deansInfo.items.length === 0) deansInfo.page = 0 })
</script>

<PageHeader title="Dean Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add Dean</span>
    </Button>
</PageHeader>
<SystemAdminDeansList
    bind:searchQuery
    {deansInfo}
    clearHandler={handleSearchClearing}
    searchHandler={handleDeansSearching}
    refetchHandler={handleDeansRefetching}
    fetchPrevHandler={handlePrevDeansFetching}
    fetchNextHandler={handleNextDeansFetching}
/>

{#if isAddModalOpen}
    <AddDeanModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await handleDeansFetching(undefined, false)}
    />
{/if}