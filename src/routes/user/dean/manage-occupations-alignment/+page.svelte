<script>
    import { onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { Course } from "$lib/client/course";
    import { Occupation } from "$lib/client/occupation";
    import PageHeader from "$lib/components/single/admin/PageHeader.svelte";
	import Button from "$lib/components/single/global/Button.svelte";
	import DeanOccupationsList from "$lib/components/grouped/dean/DeanOccupationsList.svelte";

    let searchQuery = $state("")
    let aligned = $state(false)
    let courseId = $state(0)
    let courses = $state(null)
    let occupationsInfo = $state({
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
    
    async function fetchOccupations(query = undefined, aligned = undefined) {
        occupationsInfo.loading = true
        const [status, data] = await Occupation.searchWithCourseId(
            courseId,
            aligned,
            query,
            occupationsInfo.page,
            occupationsInfo.page_size
        )
        occupationsInfo.loading = false

        Object.assign(occupationsInfo, data)
    }
    
    async function fetchPrevOccupations() {
        if (!occupationsInfo.has_prev) return
        
        occupationsInfo.loading = true
        const [status, data] = await Occupation.searchWithCourseId(
            courseId,
            aligned,
            searchQuery.length ? searchQuery : undefined,
            occupationsInfo.page - 1,
            occupationsInfo.page_size
        )
        occupationsInfo.loading = false
        
        Object.assign(occupationsInfo, data)
    }
            
    async function fetchNextOccupations() {
        if (!occupationsInfo.has_next) return
                
        occupationsInfo.loading = true
        const [status, data] = await Occupation.searchOccupations(
            courseId,
            aligned,
            searchQuery.length ? searchQuery : undefined,
            occupationsInfo.page + 1,
            occupationsInfo.page_size
        )
        occupationsInfo.loading = false

        Object.assign(occupationsInfo, data)
    }

    async function fetchCourses() {
        const [status, data] = await Course.getDeanList()

        if (status !== 200) return

        courses = data

        if (courses.length > 0) courseId = courses[0].id
    }

    onMount(async () => await fetchCourses())
    $effect(async () => { if (courses && courses.length > 0) await fetchOccupations(undefined, aligned) })
</script>

<PageHeader title="Occupations Alignement Management" />
<DeanOccupationsList
    {occupationsInfo}
    bind:searchQuery
    bind:aligned
    bind:courseId
    bind:courses
    clearHandler={async () => {
        occupationsInfo.page = 1
        await fetchOccupations(undefined, aligned)
    }}
    searchHandler={async () => {
        occupationsInfo.page = 1
        await fetchOccupations(searchQuery, aligned)
    }}
    refetchHandler={async (prev = false) => {
        if (prev && occupationsInfo.page > 1) occupationsInfo.page--

        await fetchOccupations(undefined, aligned)
    }}
    fetchPrevHandler={fetchPrevOccupations}
    fetchNextHandler={fetchNextOccupations}
/>