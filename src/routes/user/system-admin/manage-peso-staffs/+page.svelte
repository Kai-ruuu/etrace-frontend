<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { PesoStaff } from "$lib/client/peso_staff";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import SystemAdminDeansList from "$lib/components/grouped/system-admin/SystemAdminDeansList.svelte";
	import SystemAdminPesoStaffsList from "$lib/components/grouped/system-admin/SystemAdminPesoStaffsList.svelte";
	import AddPesoStaffModal from "$lib/components/single/system-admin/AddPesoStaffModal.svelte";

    let searchQuery = $state("")
    let pesoStaffsInfo = $state({
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
    
    async function fetchPesoStaffs(query = undefined) {
        pesoStaffsInfo.loading = true
        const [status, data] = await PesoStaff.searchPesoStaffs(
            query,
            pesoStaffsInfo.page,
            pesoStaffsInfo.page_size
        )
        pesoStaffsInfo.loading = false
        
        Object.assign(pesoStaffsInfo, data)
    }
    
    async function fetchPrevPesoStaffs() {
        if (!pesoStaffsInfo.has_prev) return
        
        pesoStaffsInfo.loading = true
        const [status, data] = await PesoStaff.searchPesoStaffs(
            searchQuery.length ? searchQuery : undefined,
            false,
            pesoStaffsInfo.page - 1,
            pesoStaffsInfo.page_size
        )
        pesoStaffsInfo.loading = false
        
        Object.assign(pesoStaffsInfo, data)
    }
            
    async function fetchNextPesoStaffs() {
        if (!pesoStaffsInfo.has_next) return
                
        pesoStaffsInfo.loading = true
        const [status, data] = await PesoStaff.searchPesoStaffs(
            searchQuery.length ? searchQuery : undefined,
            false,
            pesoStaffsInfo.page + 1,
            pesoStaffsInfo.page_size
        )
        pesoStaffsInfo.loading = false

        Object.assign(pesoStaffsInfo, data)
    }

    onMount(async () => await fetchPesoStaffs(undefined))
    $effect(() => { if (pesoStaffsInfo.items.length === 0) pesoStaffsInfo.page = 0 })
</script>

<PageHeader title="PESO Staff Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add PESO Staff</span>
    </Button>
</PageHeader>
<SystemAdminPesoStaffsList
    bind:searchQuery
    {pesoStaffsInfo}
    fetchPrevHandler={fetchPrevPesoStaffs}
    fetchNextHandler={fetchNextPesoStaffs}
    clearHandler={async () => {
        pesoStaffsInfo.page = 1
        await fetchPesoStaffs(undefined, false)
    }}
    searchHandler={async () => {
        pesoStaffsInfo.page = 1
        await fetchPesoStaffs(searchQuery, false)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && pesoStaffsInfo.page > 1) pesoStaffsInfo.page--

        await fetchPesoStaffs(undefined, false)
    }}
/>

{#if isAddModalOpen}
    <AddPesoStaffModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await fetchPesoStaffs(undefined, false)}
    />
{/if}