<script>
    import { Company } from "$lib/client/company";
	import { Archive, ArchiveRestore, BookSearch, CircleMinus, CirclePause, CirclePlus, Search, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";
	import { getDisplayApprovalStatus } from "$lib/helpers/user";
	import ApprovalStatusColumn from "$lib/components/single/global/ApprovalStatusColumn.svelte";
	import { approvalStatus } from "$lib/constants/user";

    let {
        searchQuery = $bindable(""),
        requirementsInfo = $bindable(null),
        isViewReqModalOpen = $bindable(false),
        companiesInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function reject(company) {
        await Company.rejectById(company.id)

        const pageIsEmpty = companiesInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function pend(company) {
        await Company.pendById(company.id)

        const pageIsEmpty = companiesInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    async function approve(company) {
        await Company.approveById(company.id)

        const pageIsEmpty = companiesInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }

    function openModalAndSetReqInfo(company) {
        isViewReqModalOpen = true;
        requirementsInfo = {
            sec_filename: company.company_profile.sec_filename,
            profile_filename: company.company_profile.profile_filename,
            business_permit_filename: company.company_profile.business_permit_filename,
            list_of_vacancies_filename: company.company_profile.list_of_vacancies_filename,
            cert_from_dole_filename: company.company_profile.cert_from_dole_filename,
            cert_of_no_pending_case_filename: company.company_profile.cert_of_no_pending_case_filename,
            reg_dti_cda_filename: company.company_profile.reg_dti_cda_filename,
            reg_of_est_filename: company.company_profile.reg_of_est_filename,
            reg_philjobnet_filename: company.company_profile.reg_philjobnet_filename,
        }
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch grow relative">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Company Name"
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
        {#if companiesInfo.loading}
            <LoadingDataIndicator>Loading Companies...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">Name</th>
                        <th class="text-left p-2">Address</th>
                        <th class="text-left p-2">Email</th>
                        <th class="text-left p-2">Approval Status</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each companiesInfo.items as company}
                        <tr>
                            <td class="p-2">{company.company_profile.name}</td>
                            <td class="p-2">{company.company_profile.address}</td>
                            <td class="p-2">{company.email}</td>
                            <ApprovalStatusColumn status={company.company_profile.peso_staff_approval_status} />
                            <td class="p-2 flex items-center space-x-3">
                                <Button
                                    variant="sm"
                                    onclick={() => openModalAndSetReqInfo(company)}
                                >
                                    <BookSearch class="w-4 text-white" />
                                    <span class="pr-1">Requirements</span>
                                </Button>
                                {#if company.company_profile.peso_staff_approval_status !== approvalStatus.APPROVED}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await approve(company)
                                    }>
                                        <CirclePlus class="w-4 text-white" />
                                        <span class="pr-1">Approve</span>
                                    </Button>
                                {/if}
                                {#if company.company_profile.peso_staff_approval_status !== approvalStatus.PENDING}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await pend(company)
                                    }>
                                        <CirclePause class="w-4 text-white" />
                                        <span class="pr-1">Pend</span>
                                    </Button>
                                {/if}
                                {#if company.company_profile.peso_staff_approval_status !== approvalStatus.REJECTED}
                                    <Button
                                        variant="sm"
                                        onclick={async () => await reject(company)
                                    }>
                                        <CircleMinus class="w-4 text-white" />
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

<Paginator {fetchPrevHandler} {fetchNextHandler} info={companiesInfo} />