<script>
	import { Eye, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
	import { getRequirementPath } from "$lib/helpers/api";

    const {
        requirementsInfo = $bindable(null),
        exitHandler,
        refetchHandler,
    } = $props()
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center py-8">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-2/3 h-full">
        <ModalHeader title="Company Requirements">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 space-x-3 overflow-x-hidden overflow-y-auto">
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Company Profile</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("profile", requirementsInfo.profile_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="Company Profile"
                    src={getRequirementPath("profile", requirementsInfo.profile_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>SEC</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("sec", requirementsInfo.sec_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="SEC"
                    src={getRequirementPath("sec", requirementsInfo.sec_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Business Permit</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("business_permit", requirementsInfo.business_permit_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="Business Permit"
                    src={getRequirementPath("business_permit", requirementsInfo.business_permit_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>List of Vacancies</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("list_of_vacancies", requirementsInfo.list_of_vacancies_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="List of Vacancies"
                    src={getRequirementPath("list_of_vacancies", requirementsInfo.list_of_vacancies_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Certification from DOLE Provincial Office</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("cert_from_dole", requirementsInfo.cert_from_dole_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="List of Vacancies"
                    src={getRequirementPath("cert_from_dole", requirementsInfo.cert_from_dole_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Certification of No Pending Case</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("cert_of_no_pending_case", requirementsInfo.cert_of_no_pending_case_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="Certification of No Pending Case"
                    src={getRequirementPath("cert_of_no_pending_case", requirementsInfo.cert_of_no_pending_case_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>DTI/CDA Reg.</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("reg_dti_cda", requirementsInfo.reg_dti_cda_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="DTI/CDA Reg."
                    src={getRequirementPath("reg_dti_cda", requirementsInfo.reg_dti_cda_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Registry of Establishment fr. DOLE</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("reg_of_est", requirementsInfo.reg_of_est_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="Registry of Establishment fr. DOLE"
                    src={getRequirementPath("reg_of_est", requirementsInfo.reg_of_est_filename)}
                    class="grow"
                >
                </iframe>
            </div>
            <div class="flex flex-col items-stretch gap-y-4 min-h-164">
                <div class="flex items-center justify-between">
                    <h1>Phil-JobNet Reg.</h1>
                    <a
                        target="_blank"
                        href={getRequirementPath("reg_philjobnet", requirementsInfo.reg_philjobnet_filename)}
                        class="bg-red-800 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-x-1"
                    >
                        <Eye class="w-4 text-white" />
                        <span class="pr-1">Full View</span>
                    </a>
                </div>
                <iframe
                    frameborder="0"
                    title="Phil-JobNet Reg."
                    src={getRequirementPath("reg_philjobnet", requirementsInfo.reg_philjobnet_filename)}
                    class="grow"
                >
                </iframe>
            </div>
        </div>
    </div>
</div>