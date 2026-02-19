<script>
	import { Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
	import { School } from "$lib/client/school";

    const {
        exitHandler,
        refetchHandler
    } = $props()

    let schoolName = $state("")
    let errors = $state([])

    async function addSchool() {
        const [status, data] = await School.add(schoolName)

        if (status === 200) await refetchHandler()
    }
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3">
        <ModalHeader title="Add School">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 flex items-center space-x-3">
            <TextField
                bind:value={schoolName}
                {errors}
                placeholder="New school's name"
                class="grow"
            >
                <Button
                    onclick={addSchool}
                    class="text-center"
                >
                    <Plus class="w-5" />
                    <span class="pr-2">Add</span>
                </Button>
            </TextField>
        </div>
    </div>
</div>