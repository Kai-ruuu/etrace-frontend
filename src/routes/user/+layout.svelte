<script>
    import Sidebar from "$lib/components/grouped/Sidebar.svelte";
    import LoadingAnimation from "$lib/components/single/LoadingAnimation.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
	import { me } from "$lib/client/authentication";

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
            <div class="h-screen min-w-3/4 max-w-3/4 overflow-auto">
                {@render children()}
            </div>
        </div>
    {/if}
</div>