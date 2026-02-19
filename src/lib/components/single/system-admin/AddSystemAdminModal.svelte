<script>
	import { onMount } from "svelte";
	import { Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
    import { SystemAdmin } from "$lib/client/system_admin";
	import { School } from "$lib/client/school";

    const {
        exitHandler,
        refetchHandler
    } = $props()

    let systemAdminInfo = $state({
        email: { value: "", errors: [] },
        first_name: { value: "", errors: [] },
        middle_name: { value: "", errors: [] },
        last_name: { value: "", errors: [] },
    })
    let schools = $state([])

    async function fetchSchools() {
        const [status, data] = await School.getAll()
        schools = data
    }
    
    async function addSystemAdmin() {
        const [status, data] = await SystemAdmin.add({
            email: systemAdminInfo.email.value,
            first_name: systemAdminInfo.first_name.value,
            middle_name: systemAdminInfo.middle_name.value,
            last_name: systemAdminInfo.last_name.value,
        })

        if (status === 200) await refetchHandler()
    }

    onMount(fetchSchools)
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3">
        <ModalHeader title="Add PESO Staff">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 flex flex-col items-stretch space-y-3">
            <TextField
                bind:value={systemAdminInfo.email.value}
                label="Email"
                error={systemAdminInfo.email.errors}
                type="email"
                placeholder="systemadmin@email.com"
                class="grow"
            />
            <TextField
                label="First Name"
                bind:value={systemAdminInfo.first_name.value}
                error={systemAdminInfo.first_name.errors}
                placeholder="Juan"
                class="grow"
            />
            <TextField
                bind:value={systemAdminInfo.middle_name.value}
                label="Middle Name"
                error={systemAdminInfo.middle_name.errors}
                required={false}
                placeholder="dela"
                class="grow"
                />
            <TextField
                bind:value={systemAdminInfo.last_name.value}
                label="Last Name"
                error={systemAdminInfo.last_name.errors}
                required={false}
                placeholder="Cruz"
                class="grow"
            />
            <Button
                onclick={addSystemAdmin}
                class="text-center"
            >
                <Plus class="w-5" />
                <span class="pr-2">Add</span>
            </Button>
        </div>
    </div>
</div>