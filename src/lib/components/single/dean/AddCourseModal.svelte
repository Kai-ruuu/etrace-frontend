<script>
	import { Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
	import { Course } from "$lib/client/course";
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";

    const {
        exitHandler,
        refetchHandler
    } = $props()

    let courseName = $state("")
    let errors = $state([])
    let schools = $state([])

    async function addCourse() {
        const [status, data] = await Course.add({
            name: courseName,
            school_id: $user.dean_profile.school_id
        })

        if (status === 200) await refetchHandler()
    }
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3">
        <ModalHeader title="Add Course">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 flex items-center space-x-3">
            <TextField
                bind:value={courseName}
                {errors}
                placeholder="New course's name"
                class="grow"
            >
                <Button
                    onclick={addCourse}
                    class="text-center"
                >
                    <Plus class="w-5" />
                    <span class="pr-2">Add</span>
                </Button>
            </TextField>
        </div>
    </div>
</div>