<script>
	import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
	import { role } from "$lib/constants/user";
	import { signout } from "$lib/client/authentication";
	import { getDisplayName } from "$lib/helpers/user";
    import { LayoutDashboard, School, Users, Handshake, Wrench, LogOut, User } from "lucide-svelte";
    import SidebarLink from "../single/SidebarLink.svelte";
    import SidebarLinkParent from "../single/SidebarLinkParent.svelte";

    async function handleSignout() {
        const [status, data] = await signout()

        // alert(signoutResponse.detail)
        goto("/")
    }
</script>

{#if $user}
    <div class="h-screen w-1/4 p-4 flex flex-col items-stretch space-y-4">
        <div class="bg-gray-100 rounded-3xl p-3 flex items-center space-x-3">
            <div class="flex items-center justify-center w-9 h-9 bg-red-800 rounded-full">
                <User class="w-5 text-white" />
            </div>
            <div>
                <p class="font-bold">{getDisplayName($user.role)}</p>
                <p class="text-sm">{$user.email}</p>
            </div>
        </div>
        {#if $user.role === role.SYSTEM_ADMIN}
            <SidebarLink Icon={LayoutDashboard} path="/">Dashboard</SidebarLink>
            <SidebarLinkParent Icon={Wrench} label="Manage">
                <SidebarLink Icon={School} path="/manage-schools">Schools</SidebarLink>
                <SidebarLink Icon={Users} path="/manage-deans">Deans</SidebarLink>
                <SidebarLink Icon={Users} path="/manage-peso-staffs">PESO Staffs</SidebarLink>
                <SidebarLink Icon={Handshake} path="/manage-company-approvals">Company Approvals</SidebarLink>
            </SidebarLinkParent>
        {/if}
        <button
            onclick={handleSignout}
            class="pl-4 py-3 flex cursor-pointer"
        >
            <LogOut class="w-5 mr-3" />
            <p>Sign-out</p>
        </button>
    </div>
{/if}