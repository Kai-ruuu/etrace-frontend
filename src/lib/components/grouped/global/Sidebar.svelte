<script>
	import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
	import { role } from "$lib/constants/user";
	import { signout } from "$lib/client/authentication";
	import { getDisplayName } from "$lib/helpers/user";
    import { LayoutDashboard, School, Users, Handshake, Wrench, LogOut, User, Archive, Settings, Book, GraduationCap, Briefcase } from "lucide-svelte";
    import SidebarLink from "../../single/global/SidebarLink.svelte";
    import SidebarLinkParent from "../../single/global/SidebarLinkParent.svelte";

    async function handleSignout() {
        const [status, data] = await signout()
        goto("/")
    }
</script>

{#if $user}
    <div class="h-screen w-1/4 p-8 flex flex-col items-stretch shadow z-100">
        {#if $user.role === role.SYSTEM_ADMIN}
            <SidebarLink Icon={LayoutDashboard} path="/">Dashboard</SidebarLink>
            <SidebarLinkParent Icon={Wrench} label="Manage">
                <SidebarLink Icon={School} path="/manage-schools">Schools</SidebarLink>
                {#if $user.is_default}
                    <SidebarLink Icon={Users} path="/manage-system-admins">System Admins</SidebarLink>
                {/if}
                <SidebarLink Icon={Users} path="/manage-deans">Deans</SidebarLink>
                <SidebarLink Icon={Users} path="/manage-peso-staffs">PESO Staffs</SidebarLink>
                <SidebarLink Icon={Handshake} path="/manage-company-approvals">Company Approvals</SidebarLink>
            </SidebarLinkParent>
            <SidebarLinkParent Icon={Settings} label="Settings">
                <SidebarLink Icon={User}>Account</SidebarLink>
                <SidebarLinkParent Icon={Archive} label="Archives">
                    <SidebarLink Icon={School} path="/manage-achived-schools">Schools</SidebarLink>
                </SidebarLinkParent>
            </SidebarLinkParent>
        {:else if $user.role === role.DEAN}
            <SidebarLink Icon={LayoutDashboard} path="/">Dashboard</SidebarLink>
            <SidebarLinkParent Icon={Wrench} label="Manage">
                <SidebarLink Icon={Book} path="/manage-courses">Courses</SidebarLink>
                <SidebarLink Icon={GraduationCap} path="/manage-graduate-records">Graduate Records</SidebarLink>
                <SidebarLink Icon={Briefcase} path="/manage-occupations-alignment">Occupations Alignment</SidebarLink>
                <SidebarLink Icon={Users} path="/manage-alumni-approvals">Alumni Approval</SidebarLink>
            </SidebarLinkParent>
            <SidebarLinkParent Icon={Settings} label="Settings">
                <SidebarLink Icon={User}>Account</SidebarLink>
                <SidebarLinkParent Icon={Archive} label="Archives">
                    <SidebarLink Icon={Book} path="/manage-achived-courses">Courses</SidebarLink>
                    <SidebarLink Icon={GraduationCap} path="/manage-archived-graduate-records">Graduate Records</SidebarLink>
                </SidebarLinkParent>
            </SidebarLinkParent>
        {:else if $user.role === role.PESO_STAFF}
            <SidebarLink Icon={LayoutDashboard} path="/">Dashboard</SidebarLink>
            <SidebarLinkParent Icon={Wrench} label="Manage">
                <SidebarLink Icon={Users} path="/manage-company-approvals">Company Approval</SidebarLink>
            </SidebarLinkParent>
            <SidebarLinkParent Icon={Settings} label="Settings">
                <SidebarLink Icon={User}>Account</SidebarLink>
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