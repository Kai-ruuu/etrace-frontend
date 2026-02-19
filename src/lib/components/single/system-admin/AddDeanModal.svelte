<script>
	import { onMount } from "svelte";
	import { Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
    import { Dean } from "$lib/client/dean";
	import { School } from "$lib/client/school";

    const {
        exitHandler,
        refetchHandler
    } = $props()

    let deanInfo = $state({
        email: { value: "", errors: [] },
        first_name: { value: "", errors: [] },
        middle_name: { value: "", errors: [] },
        last_name: { value: "", errors: [] },
        school_id: { value: 0, errors: [] },
    })
    let schools = $state([])

    async function fetchSchools() {
        const [status, data] = await School.getAll()

        if (status === 200) schools = data
    }
    
    async function addDean() {
        const [status, data] = await Dean.add({
            email: deanInfo.email.value,
            first_name: deanInfo.first_name.value,
            middle_name: deanInfo.middle_name.value,
            last_name: deanInfo.last_name.value,
            school_id: deanInfo.school_id.value,
        })

        if (status === 200) await refetchHandler()
    }

    onMount(fetchSchools)
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3">
        <ModalHeader title="Add Dean">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 flex flex-col items-stretch space-y-3">
            <TextField
                bind:value={deanInfo.email.value}
                label="Email"
                error={deanInfo.email.errors}
                type="email"
                placeholder="dean@email.com"
                class="grow"
            />
            <TextField
                label="First Name"
                bind:value={deanInfo.first_name.value}
                error={deanInfo.first_name.errors}
                placeholder="Juan"
                class="grow"
            />
            <TextField
                bind:value={deanInfo.middle_name.value}
                label="Middle Name"
                error={deanInfo.middle_name.errors}
                required={false}
                placeholder="dela"
                class="grow"
                />
            <TextField
                bind:value={deanInfo.last_name.value}
                label="Last Name"
                error={deanInfo.last_name.errors}
                required={false}
                placeholder="Cruz"
                class="grow"
            />
            <div class="relative flex flex-col items-stretch">
                <label for="school-id" class="text-sm pb-1">School</label>
                <select
                    bind:value={deanInfo.school_id.value}
                    id="school-id" class="bg-gray-100 border-none rounded-lg w-full"
                >
                    {#each schools as school}
                        <option value={school.id}>{school.name}</option>
                    {/each}
                </select>
            </div>
            <Button
                onclick={addDean}
                class="text-center"
            >
                <Plus class="w-5" />
                <span class="pr-2">Add</span>
            </Button>
        </div>
    </div>
</div>