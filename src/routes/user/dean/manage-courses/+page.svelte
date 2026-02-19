<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Course } from "$lib/client/course";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import DeanCoursesList from "$lib/components/grouped/dean/DeanCoursesList.svelte";
	import AddCourseModal from "$lib/components/single/dean/AddCourseModal.svelte";
	import Button from "$lib/components/single/global/Button.svelte";

    let searchQuery = $state("")
    let coursesInfo = $state({
        items: [],
        total: 0,
        total_pages: 0,
        page: 1,
        page_size: 20,
        has_next: false,
        has_prev: false,
        loading: false,
    })
    let isAddModalOpen = $state(false)
    
    async function handleCourseFetching(query = undefined, archived = undefined) {
        coursesInfo.loading = true
        const [status, data] = await Course.searchCourses(
            query,
            archived,
            coursesInfo.page,
            coursesInfo.page_size
        )
        coursesInfo.loading = false
        
        Object.assign(coursesInfo, data)
    }
    
    async function handlePrevCoursesFetching() {
        if (!coursesInfo.has_prev) return
        
        coursesInfo.loading = true
        const [status, data] = await Course.searchCourses(
            searchQuery.length ? searchQuery : undefined,
            false,
            coursesInfo.page - 1,
            coursesInfo.page_size
        )
        coursesInfo.loading = false
        
        Object.assign(coursesInfo, data)
    }
            
    async function handleNextCoursesFetching() {
        if (!coursesInfo.has_next) return
                
        coursesInfo.loading = true
        const [status, data] = await Course.searchCourses(
            searchQuery.length ? searchQuery : undefined,
            false,
            coursesInfo.page + 1,
            coursesInfo.page_size
        )
        coursesInfo.loading = false

        Object.assign(coursesInfo, data)
    }

    async function handleCourseSearching() {
        coursesInfo.page = 1
        await handleCourseFetching(searchQuery, false)
    }

    async function handleSearchClearing() {
        coursesInfo.page = 1
        await handleCourseFetching(undefined, false)
    }

    async function handleCoursesRefetching(prev = false) {
        if (prev && coursesInfo.page > 1) {
            coursesInfo.page--;
        }

        await handleCourseFetching(undefined, false);
    }

    onMount(async () => await handleCourseFetching(undefined, false))
    $effect(() => { if (coursesInfo.items.length === 0) coursesInfo.page = 0 })
</script>

<PageHeader title="Course Management">
    <Button onclick={() => isAddModalOpen = true}>
        <Plus class="w-5 text-white" />
        <span class="pr-2">Add Course</span>
    </Button>
</PageHeader>
<DeanCoursesList
    {coursesInfo}
    bind:searchQuery
    forArchived={false}
    clearHandler={handleSearchClearing}
    searchHandler={handleCourseSearching}
    refetchHandler={handleCoursesRefetching}
    fetchPrevHandler={handlePrevCoursesFetching}
    fetchNextHandler={handleNextCoursesFetching}
/>

{#if isAddModalOpen}
    <AddCourseModal
        exitHandler={() => isAddModalOpen = false}
        refetchHandler={async () => await handleCourseFetching(undefined, false)}
    />
{/if}