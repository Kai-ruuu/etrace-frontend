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
    
    async function fetchCourses(query = undefined, archived = undefined) {
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
    
    async function fetchPrevCourses() {
        if (!coursesInfo.has_prev) return
        
        coursesInfo.loading = true
        const [status, data] = await Course.searchCourses(
            searchQuery.length ? searchQuery : undefined,
            true,
            coursesInfo.page - 1,
            coursesInfo.page_size
        )
        coursesInfo.loading = false
        
        Object.assign(coursesInfo, data)
    }
            
    async function fetchNextCourses() {
        if (!coursesInfo.has_next) return
                
        coursesInfo.loading = true
        const [status, data] = await Course.searchCourses(
            searchQuery.length ? searchQuery : undefined,
            true,
            coursesInfo.page + 1,
            coursesInfo.page_size
        )
        coursesInfo.loading = false

        Object.assign(coursesInfo, data)
    }

    onMount(async () => await fetchCourses(undefined, true))
    $effect(() => { if (coursesInfo.items.length === 0) coursesInfo.page = 0 })
</script>

<PageHeader title="Archived Course Management" />
<DeanCoursesList
    forArchived={true}
    {coursesInfo}
    bind:searchQuery
    clearHandler={async () => {
        coursesInfo.page = 1
        await fetchCourses(undefined, true)
    }}
    searchHandler={async () => {
        coursesInfo.page = 1
        await fetchCourses(searchQuery, true)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && coursesInfo.page > 1) coursesInfo.page--

        await fetchCourses(undefined, true)
    }}
    fetchPrevHandler={fetchPrevCourses}
    fetchNextHandler={fetchNextCourses}
/>