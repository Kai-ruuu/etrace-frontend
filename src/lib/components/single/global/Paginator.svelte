<script>
    import { ChevronLeft, ChevronRight } from "lucide-svelte";
	import Button from "./Button.svelte";
    let {
        info,
        fetchPrevHandler,
        fetchNextHandler
    } = $props()
</script>

<div class="sticky bottom-0 left-0 flex items-center border-t border-t-gray-200 justify-between pl-10 pr-8 py-4 bg-white">
    <p>Page {info.page} of {info.total_pages}</p>
    <div class="flex items-center space-x-4">
        <Button
            onclick={fetchPrevHandler}
            disabled={!info.has_prev}
        >
            <ChevronLeft class="w-5" />
            <span class="pr-2">Prev</span>
        </Button>
        <Button
            onclick={fetchNextHandler}
            disabled={!info.has_next}
        >
            <span class="pl-2">Next</span>
            <ChevronRight class="w-5" />
        </Button>   
    </div>
</div>