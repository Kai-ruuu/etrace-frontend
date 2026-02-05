<script>
    import { page } from '$app/stores';
    import { user } from "$lib/stores/user";
    import { role } from "$lib/constants/user";

    const props = $props();

    const pathPrefix = {
        [role.SYSTEM_ADMIN]: "/user/system-admin"
    };

    const finalPathname = pathPrefix[$user.role] + props.path
    const isActive = $derived($page.url.pathname === finalPathname || $page.url.pathname + "/" === finalPathname)
</script>

<a
    href={finalPathname}
    class={`
    flex py-3 pl-4
    rounded-full cursor-pointer
    hover:bg-red-800/75 hover:text-white
    ${isActive && "bg-red-800 text-white"}`}
>
    <props.Icon class="w-5 mr-3" />
    <p>{@render props.children()}</p>
</a>