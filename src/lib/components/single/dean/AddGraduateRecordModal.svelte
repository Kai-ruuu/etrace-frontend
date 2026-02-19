<script>
	import { Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
	import { Course } from "$lib/client/course";
	import { GraduateRecord } from "$lib/client/graduate_record";
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import FileField from "../global/FileField.svelte";

    const {
        exitHandler,
        refetchHandler
    } = $props()

    let recordInfo = $state({
        graduate_record_file: {
            value: null,
            errors: []
        },
        graduation_year: {
            value: (new Date()).getFullYear(),
            errors: []
        },
        course_id: {
            value: 0,
            errors: []
        }
    })
    let deanSchoolCourses = $state([])

    async function fetchDeanSchoolCourses() {
        const [status, data] = await Course.getDeanList()

        if (status === 200) deanSchoolCourses = data
    }
    
    async function addGraduateRecord() {
        const [status, data] = await GraduateRecord.add({
            graduate_record_file: recordInfo.graduate_record_file.value,
            graduation_year: recordInfo.graduation_year.value,
            course_id: recordInfo.course_id.value
        })

        if (status === 200) await refetchHandler()
    }

    onMount(fetchDeanSchoolCourses)
</script>

<div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
    <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3">
        <ModalHeader title="Add Graduate Record">
            <TransparentButton onclick={exitHandler}>
                <X class="w-5" />
            </TransparentButton>
        </ModalHeader>
        <div class="p-8 flex flex-col items-stretch space-y-3">
            <FileField
                accept=".csv"
                label="Graduate Record (CSV)"
                bind:value={recordInfo.graduate_record_file.value}
                errors={recordInfo.graduate_record_file.errors}
                placeholder={`BSCS-${(new Date()).getFullYear()}.csv`}
            />
            <TextField
                label="Graduation Year"
                allowClear={false}
                bind:value={recordInfo.graduation_year.value}
                errors={recordInfo.graduation_year.errors}
                type="number"
                placeholder={String((new Date()).getFullYear())}
                class="grow"
            >
            </TextField>
            <div class="relative flex flex-col items-stretch">
                <label for="course-id" class="text-sm pb-1">Course</label>
                <select
                    bind:value={recordInfo.course_id.value}
                    id="course-id" class="bg-gray-100 border-none rounded-lg w-full"
                >
                    {#each deanSchoolCourses as course}
                        <option value={course.id}>{course.name}</option>
                    {/each}
                </select>
            </div>
            <Button
                onclick={addGraduateRecord}
                class="text-center"
            >
                <Plus class="w-5" />
                <span class="pr-2">Add</span>
            </Button>
        </div>
    </div>
</div>