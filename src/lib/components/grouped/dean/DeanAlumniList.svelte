<script>
    import { Dean } from "$lib/client/dean";
	import { Archive, ArchiveRestore, CircleMinus, CirclePause, CirclePlus, MapPin, Search, UserRoundSearch, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";
	import { approvalStatus } from "$lib/constants/user";
	import { Alumni } from "$lib/client/alumni";

    let {
        _status = $bindable(approvalStatus.PENDING),
        searchQuery = $bindable(""),
        viewAlumniId = $bindable(null),
        isViewModalOpen = $bindable(false),
        alumniInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function reject(alumni) {
        await Alumni.rejectById(alumni.id)

        const pageIsEmpty = alumniInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function pend(alumni) {
        await Alumni.pendById(alumni.id)

        const pageIsEmpty = alumniInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function approve(alumni) {
        await Alumni.approveById(alumni.id)

        const pageIsEmpty = alumniInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch space-x-3 grow relative">
            <select
                bind:value={_status}
                onchange={async (e) => await searchHandler()}
                class="rounded-lg border-none bg-gray-100"
            >
                <option value={approvalStatus.PENDING}>Pending</option>
                <option value={approvalStatus.APPROVED}>Approved</option>
                <option value={approvalStatus.REJECTED}>Rejected</option>
            </select>
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
        {#if alumniInfo.loading}
            <LoadingDataIndicator>Loading Alumni...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">First</th>
                        <th class="text-left p-2">Middle</th>
                        <th class="text-left p-2">Last</th>
                        <th class="text-left p-2">Email</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each alumniInfo.items as alumni}
                        <tr>
                            <td class="p-2">{alumni.alumni_profile.first_name}</td>
                            <td class="p-2">{alumni.alumni_profile.middle_name ? alumni.alumni_profile.middle_name : "-"}</td>
                            <td class="p-2">{alumni.alumni_profile.last_name}</td>
                            <td class="p-2">{alumni.email}</td>
                            <td class="p-2 flex items-center space-x-3">
                                <Button variant="sm"
                                    onclick={() => {
                                        viewAlumniId = alumni.id
                                        isViewModalOpen = true
                                    }}
                                >
                                    <UserRoundSearch class="w-4 text-white" />
                                    <span class="pr-1">Profile</span>
                                </Button>
                                {#if alumni.alumni_profile.dean_approval_status !== approvalStatus.APPROVED}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await approve(alumni)
                                    }>
                                        <CirclePlus class="w-4 text-white" />
                                        <span class="pr-1">Approve</span>
                                    </Button>
                                {/if}
                                {#if alumni.alumni_profile.dean_approval_status !== approvalStatus.PENDING}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await pend(alumni)
                                    }>
                                        <CirclePause class="w-4 text-white" />
                                        <span class="pr-1">Pend</span>
                                    </Button>
                                {/if}
                                {#if alumni.alumni_profile.dean_approval_status !== approvalStatus.REJECTED}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await reject(alumni)
                                    }>
                                        <CircleMinus class="w-5 text-white" />
                                        <span class="pr-1">Reject</span>
                                    </Button>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={alumniInfo} />