<script>
    import { onMount } from "svelte";
	import { Plus, X } from "lucide-svelte";
    import { GraduateRecord } from "$lib/client/graduate_record";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import AddGraduateRecordModal from "$lib/components/single/dean/AddGraduateRecordModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import DeanGraduateRecordsList from "$lib/components/grouped/dean/DeanGraduateRecordsList.svelte";
	import { Course } from "$lib/client/course";

    let searchQuery = $state("")
    let recordsInfo = $state({
        items: [],
        total: 0,
        total_pages: 0,
        page: 1,
        page_size: 20,
        has_next: false,
        has_prev: false,
        loading: false,
    })

    let isRecordOpen = $state(false);
    let isAddModalOpen = $state(false);
    
    let recordFileName = $state(null);

    let filterCourses = $state([]);
    let filterCourseId = $state(null);
    let isFilterCoursesReady = $state(false);

    async function handleDeanSchoolCoursesFetching() {
        const [status, data] = await Course.getDeanList();

        if (status === 200) {
            filterCourses = data;

            // auto-assign selected course id if there are available courses
            if (filterCourses.length > 0) {
                filterCourseId = filterCourses[0].id
            }

            // send ready signal
            isFilterCoursesReady = true;
        } else {
            alert("Unable to fetch courses.")
        }
    }
    
    async function handleGraduateRecordsFetching(query = undefined, courseId = undefined, archived = undefined) {
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            query,
            courseId,
            archived,
            recordsInfo.page,
            recordsInfo.page_size
        )
        recordsInfo.loading = false
        
        Object.assign(recordsInfo, data)
    }
    
    async function handlePrevGraduateRecordsFetching(courseId) {
        if (!recordsInfo.has_prev) return
        
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            searchQuery.length ? searchQuery : undefined,
            courseId,
            false,
            recordsInfo.page - 1,
            recordsInfo.page_size
        )
        recordsInfo.loading = false
        
        Object.assign(recordsInfo, data)
    }
            
    async function handleNextGraduateRecordsFetching(courseId) {
        if (!recordsInfo.has_next) return
                
        recordsInfo.loading = true
        const [status, data] = await GraduateRecord.searchGraduateRecords(
            searchQuery.length ? searchQuery : undefined,
            courseId,
            false,
            recordsInfo.page + 1,
            recordsInfo.page_size
        )
        recordsInfo.loading = false

        Object.assign(recordsInfo, data)
    }

    async function handleGraduateRecordsSearching() {
        recordsInfo.page = 1
        await handleGraduateRecordsFetching(searchQuery, filterCourseId, false)
    }
    
    async function handleSearchClearing() {
        recordsInfo.page = 1;
        await handleGraduateRecordsFetching(undefined, filterCourseId, false);
    }

    async function handleGraduateRecordsRefetching(prev = false) {
        if (prev && recordsInfo.page > 1) {
            recordsInfo.page--;
        }

        await handleGraduateRecordsFetching(undefined, filterCourseId, false)
    }

    onMount(async () => await handleDeanSchoolCoursesFetching())
    $effect(async () => {
        if (isFilterCoursesReady) {
            await handleGraduateRecordsFetching(undefined, filterCourseId, false)
        }
    })
</script>

<PageHeader title={isRecordOpen ? recordFileName : "Graduate Record Management"}>
    {#if isRecordOpen}
        <Button onclick={() => isRecordOpen = false}>
            <X class="w-5 text-white" />
            <span class="pr-2">Close Record</span>
        </Button>
    {:else}
        <Button onclick={() => isAddModalOpen = true}>
            <Plus class="w-5 text-white" />
            <span class="pr-2">Add Graduate Record</span>
        </Button>
    {/if}
</PageHeader>
<DeanGraduateRecordsList
    forArchived={false}
    {recordsInfo}
    bind:searchQuery
    bind:isRecordOpen
    bind:recordFileName
    bind:filterCourses
    bind:filterCourseId
    bind:isFilterCoursesReady
    clearHandler={handleSearchClearing}
    searchHandler={handleGraduateRecordsSearching}
    refetchHandler={handleGraduateRecordsRefetching}
    fetchPrevHandler={handlePrevGraduateRecordsFetching}
    fetchNextHandler={handleNextGraduateRecordsFetching}
/>

{#if isAddModalOpen}
    <AddGraduateRecordModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await handleGraduateRecordsFetching(undefined, filterCourseId, false)}
    />
{/if}