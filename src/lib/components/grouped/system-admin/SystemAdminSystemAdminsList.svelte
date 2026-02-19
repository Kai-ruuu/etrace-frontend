<script>
    import { SystemAdmin } from "$lib/client/system_admin";
	import { Archive, ArchiveRestore, CircleMinus, CirclePlus, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import { onMount } from "svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";

    let {
        searchQuery = $bindable(""),
        systemAdminsInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function disable(systemAdmin) {
        const [status, data] = await SystemAdmin.disableById(systemAdmin.id)

        if (status !== 200) {
            alert(data?.detail ?? "Unable to disable System Administrator.");
        }

        const pageIsEmpty = systemAdminsInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function enable(systemAdmin) {
        const [status, data] = await SystemAdmin.enableById(systemAdmin.id)

        if (status !== 200) {
            alert(data?.detail ?? "Unable to enable System Administrator.");
        }

        const pageIsEmpty = systemAdminsInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch grow relative">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Juan dela Cruz"
                class="w-full indent-3 rounded-lg bg-gray-100 border-none"
            >
            {#if String(searchQuery).trim().length}
                <TransparentButton
                    onclick={async () => {
                        searchQuery = ""
                        await searchHandler()
                    }}
                    title="Clear Search"
                    class="absolute right-2 top-[50%] translate-y-[-50%]"
                >
                    <X class="w-5" />
                </TransparentButton>
            {/if}
        </div>
        <Button onclick={searchHandler}>
            <Search class="w-5 text-white" />
            <span class="pr-2">Search</span>
        </Button>
    </div>
    <div class="overflow-x-hidden overflow-y-auto">
        {#if systemAdminsInfo.loading}
            <LoadingDataIndicator>Loading System Admins...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">First</th>
                        <th class="text-left p-2">Middle</th>
                        <th class="text-left p-2">Last</th>
                        <th class="text-left p-2">Email</th>
                        <th class="text-left p-2">Status</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each systemAdminsInfo.items as systemAdmin}
                        <tr>
                            <td class="p-2">{systemAdmin.system_admin_profile.first_name}</td>
                            <td class="p-2">{systemAdmin.system_admin_profile.middle_name ? systemAdmin.system_admin_profile.middle_name : "-"}</td>
                            <td class="p-2">{systemAdmin.system_admin_profile.last_name}</td>
                            <td class="p-2">{systemAdmin.email}</td>
                            <td class={`p-2 ${systemAdmin.is_disabled ? "text-red-700" : "text-green-700"}`}>{systemAdmin.is_disabled ? "Disabled" : "Enabled"}</td>
                            <td class="p-2">
                                <Button
                                    variant="sm"
                                    onclick={async () => {
                                        if (systemAdmin.is_disabled) await enable(systemAdmin)
                                        else await disable(systemAdmin)
                                    }}
                                >
                                    {#if systemAdmin.is_disabled}
                                        <CirclePlus class="w-4 text-white" />
                                    {:else}
                                        <CircleMinus class="w-4 text-white" />
                                    {/if}
                                    <span class="pr-2">{systemAdmin.is_disabled ? "Enable" : "Disable"}</span>
                                </Button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={systemAdminsInfo} />