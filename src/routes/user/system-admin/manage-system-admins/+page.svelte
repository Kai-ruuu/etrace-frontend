<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { SystemAdmin } from "$lib/client/system_admin";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import AddSystemAdminModal from "$lib/components/single/system-admin/AddSystemAdminModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import SystemAdminSystemAdminsList from "$lib/components/grouped/system-admin/SystemAdminSystemAdminsList.svelte";

    let searchQuery = $state("")
    let systemAdminsInfo = $state({
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
    
    async function handleSystemAdminsFetching(query = undefined) {
        systemAdminsInfo.loading = true
        const [status, data] = await SystemAdmin.searchSystemAdmins(
            query,
            systemAdminsInfo.page,
            systemAdminsInfo.page_size
        )
        systemAdminsInfo.loading = false
        
        Object.assign(systemAdminsInfo, data)
    }
    
    async function handlePrevSystemAdminsFetching() {
        if (!systemAdminsInfo.has_prev) return
        
        systemAdminsInfo.loading = true
        const [status, data] = await SystemAdmin.searchSystemAdmins(
            searchQuery.length ? searchQuery : undefined,
            false,
            systemAdminsInfo.page - 1,
            systemAdminsInfo.page_size
        )
        systemAdminsInfo.loading = false
        
        Object.assign(systemAdminsInfo, data)
    }
            
    async function handleNextSystemAdminsFetching() {
        if (!systemAdminsInfo.has_next) return
                
        systemAdminsInfo.loading = true
        const [status, data] = await SystemAdmin.searchSystemAdmins(
            searchQuery.length ? searchQuery : undefined,
            false,
            systemAdminsInfo.page + 1,
            systemAdminsInfo.page_size
        )
        systemAdminsInfo.loading = false

        Object.assign(systemAdminsInfo, data)
    }

    async function handleSystemAdminsSearching() {
        systemAdminsInfo.page = 1
        await handleSystemAdminsFetching(searchQuery, false)
    }
    
    async function handleSearchClearing() {
        systemAdminsInfo.page = 1
        await handleSystemAdminsFetching(undefined, false)
    }

    async function handleSystemAdminsRefetching(prev = false) {
        if (prev && systemAdminsInfo.page > 1) systemAdminsInfo.page--

        await handleSystemAdminsFetching(undefined, false)
    }

    onMount(async () => await handleSystemAdminsFetching(undefined))
    $effect(() => { if (systemAdminsInfo.items.length === 0) systemAdminsInfo.page = 0 })
</script>

<PageHeader title="System Administrator Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add System Admin</span>
    </Button>
</PageHeader>
<SystemAdminSystemAdminsList
    bind:searchQuery
    {systemAdminsInfo}
    clearHandler={handleSearchClearing}
    searchHandler={handleSystemAdminsSearching}
    refetchHandler={handleSystemAdminsRefetching}
    fetchPrevHandler={handlePrevSystemAdminsFetching}
    fetchNextHandler={handleNextSystemAdminsFetching}
/>

{#if isAddModalOpen}
    <AddSystemAdminModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await handleSystemAdminsFetching(undefined, false)}
    />
{/if}