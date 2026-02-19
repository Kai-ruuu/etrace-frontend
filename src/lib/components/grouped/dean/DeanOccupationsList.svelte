<script>
	import { Occupation } from "$lib/client/occupation";
	import { Archive, ArchiveRestore, Link, Search, Unlink, X } from "lucide-svelte";
	import Paginator from "../../single/global/Paginator.svelte";
	import Button from "../../single/global/Button.svelte";
	import TransparentButton from "../../single/global/TransparentButton.svelte";
	import LoadingAnimation from "$lib/components/single/global/LoadingAnimation.svelte";
	import LoadingDataIndicator from "$lib/components/single/global/LoadingDataIndicator.svelte";

    let {
        aligned = $bindable(false),
        courseId = $bindable(0),
        courses = $bindable(null),
        searchQuery = $bindable(""),
        occupationsInfo,
        clearHandler,
        searchHandler,
        refetchHandler,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()

    async function unalign(occupation) {
        const [status, data] = await Occupation.unalignByCourseAndOccupationId(courseId, occupation.id)
        const pageIsEmpty = occupationsInfo.items.length - 1 === 0
        
        await refetchHandler(pageIsEmpty)
    }
    
    async function align(occupation) {
        const [status, data] = await Occupation.alignByCourseAndOccupationId(courseId, occupation.id)
        const pageIsEmpty = occupationsInfo.items.length - 1 === 0

        await refetchHandler(pageIsEmpty)
    }

    function encodeQueryFor(occupationTitle) {
        const course = courses.find((_course) => _course.id === courseId)
        const query = new URLSearchParams()
        const plainQuery = `is ${occupationTitle} aligned to the course ${course.name}`

        query.set("q", plainQuery)
        return query.toString()
    }
</script>


<div class="px-8 bg-white space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex items-stretch space-x-3 grow relative">
            <!-- course filter selection -->
            <select
                bind:value={courseId}
                class="rounded-lg border-none bg-gray-100"
            >
                {#if courses}
                    {#each courses as course}
                        <option value={course.id}>{course.name}</option>
                    {/each}
                {/if}
            </select>

            <!-- alignment filter selection -->
            <select
                bind:value={aligned}
                class="rounded-lg border-none bg-gray-100"
            >
                <option value={true}>Aligned</option>
                <option value={false}>Unaligned</option>
            </select>

            <!-- seach box -->
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Software Engineer"
                class="w-full indent-3 rounded-lg bg-gray-100 border-none"
            >
            {#if String(searchQuery).trim().length}
                <TransparentButton
                    onclick={async () => {
                        searchQuery = ""
                        await searchHandler()
                    }}
                    title="Clear Search"
                    class="absolute right-2 top-[50%] translate-y-[-50%]"
                >
                    <X class="w-5" />
                </TransparentButton>
            {/if}
        </div>
        <Button onclick={searchHandler}>
            <Search class="w-5 text-white" />
            <span class="pr-2">Search</span>
        </Button>
    </div>
    <div class="overflow-x-hidden overflow-y-auto">
        {#if occupationsInfo.loading}
            <LoadingDataIndicator>Loading Occupations...</LoadingDataIndicator>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th class="text-left p-2">Title</th>
                        <th class="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each occupationsInfo.items as occupation}
                        <tr>
                            <td class="p-2">{occupation.title}</td>
                            <td class="p-2 flex items-center space-x-3">
                                <Button
                                    variant="sm"
                                    onclick={async () => {
                                        if (aligned) await unalign(occupation)
                                        else await align(occupation)
                                    }}
                                >
                                    {#if aligned}
                                        <Unlink class="w-4 text-white" />
                                    {:else}
                                        <Link class="w-4 text-white" />
                                    {/if}
                                    <span class="pr-1">{aligned ? "Unalign" : "Align"}</span>
                                </Button>
                                {#if !aligned}
                                    <a
                                        href={`https://www.google.com/search?${encodeQueryFor(occupation.title)}`}
                                        target="_blank"
                                    >
                                        <Button
                                            variant="sm"
                                            onclick={() => {}}
                                        >
                                            <Search class="w-4 text-white" />
                                            <span class="pr-1">Web Search</span>
                                        </Button>
                                    </a>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<Paginator {fetchPrevHandler} {fetchNextHandler} info={occupationsInfo} />