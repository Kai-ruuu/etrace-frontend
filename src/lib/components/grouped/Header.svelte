<script>
    import logoRed from "$lib/assets/logo-red.png"
    import { page } from "$app/state";
    import { GraduationCap, Menu } from "lucide-svelte";
</script>

<header class="w-full md:w-2/3 bg-white px-8 py-6 rounded-4xl flex items-center justify-between">
    <div class="flex items-center space-x-2">
        <img src={logoRed} class="md:w-10" alt="etrace-logo-red">
        <h1 class="font-bold text-red-800 text-lg">E-trace</h1>
    </div>
    <div class="hidden md:flex items-center">
        <div class="border-r border-r-gray-200 px-4">
            <a
            href="/about"
            class={`${page.url.pathname == "/about" ? "bg-red-800 text-white" : ""} rounded-full px-4 py-2`}>
                About
            </a>
        </div>
        <div class="pl-4">
            <a
            href="/"
            class={`${page.url.pathname == "/" ? "bg-red-800 text-white" : ""} rounded-full px-4 py-2`}>
                Sign-in
            </a>
            <a
            href="/signup"
            class={`${page.url.pathname == "/signup" ? "bg-red-800 text-white" : ""} rounded-full px-4 py-2`}>
                Sign-up
            </a>
        </div>
    </div>
    <button class="md:hidden">
        <Menu />
    </button>
</header>