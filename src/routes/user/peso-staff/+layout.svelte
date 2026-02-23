<script>
    import Sidebar from "$lib/components/grouped/global/Sidebar.svelte";
    import LoadingAnimation from "$lib/components/single/global/LoadingAnimation.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
	import { me } from "$lib/client/authentication";
    import "leaflet/dist/leaflet.css"

    let { children } = $props();

    onMount(async function() {
        const [status, data] = await me()

        if (status == 200) user.set(data)
        else goto("/")
    })
</script>

<div class="w-screen h-screen">
    {#if $user === null}
        <LoadingAnimation />
    {:else}
        <div class="flex">
            <Sidebar />
            <div class="min-h-screen max-h-screen min-w-3/4 max-w-3/4 space-y-8 overflow-x-hidden overflow-y-auto">
                {@render children()}
            </div>
        </div>
    {/if}
</div>