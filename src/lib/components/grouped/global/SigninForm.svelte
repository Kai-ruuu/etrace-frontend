<script>
    import logoWhite from "$lib/assets/logo-white.png"
    import graduatesBg from "$lib/assets/graduates-bg.jpg"
    import { user } from "$lib/stores/user"
	import { role } from "$lib/constants/user";
	import { openIndexPage } from "$lib/helpers/user";
    import { signin } from "$lib/client/authentication";
    import { GraduationCap, Mail, Lock, Circle, CircleCheck } from "lucide-svelte";
    
    const formData = $state({
        email: {
            value: "",
            errors: []
        },
        password: {
            value: "",
            errors: []
        },
    })

    function isFormDataValid() {
        const email = String(formData.email.value).trim()
        const password = String(formData.password.value).trim()

        if (email.length === 0) formData.email.errors.push("Email is required.")
        if (!email.includes("@")) formData.email.errors.push("Email is invalid.")
        if (password.length === 0) formData.password.errors.push("Password is required.")
        else if (password.length < 8) formData.password.errors.push("Password must be at least 8 characters long.")

        const isValid = formData.email.errors.length === 0 && formData.password.errors.length === 0
        return isValid
    }

    async function handleSignin(e) {
        e.preventDefault()
        
        if (!isFormDataValid()) return

        const [status, data] = await signin(formData)
        
        if (status === 200) {
            user.set(data)
            openIndexPage(data.role)
        } else {
            console.log(data.detail)
        }
    }
</script>

<form
    onsubmit={handleSignin}
    class="bg-white rounded-4xl md:w-2/3 min-h-112 flex overflow-hidden"
>
    <div class="md:w-1/2 flex flex-col items-stretch p-8 md:p-8 space-y-8">
        <div class="flex flex-col items-stretch space-y-2">
            <h1 class="text-center font-bold text-xl">WELCOME BACK!</h1>
            <h2 class="text-center text-sm text-red-800">Sign-in using your account</h2>
        </div>
        <div class="flex flex-col items-stretch space-y-4">
            <div class="flex flex-col items-stretch relative">
                <Mail class="absolute top-1/2 left-4 translate-y-[-50%]"/>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    bind:value={formData.email.value}
                    required
                    class="border-none bg-gray-100 rounded-full p-4 indent-10"
                >
            </div>
                <div class="flex flex-col items-stretch relative">
                <Lock class="absolute top-1/2 left-4 translate-y-[-50%]"/>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    bind:value={formData.password.value}
                    minlength="8"
                    required
                    class="border-none bg-gray-100 rounded-full p-4 indent-10"
                >
            </div>
        <button
            type="submit"
            class="rounded-full bg-red-800 text-white py-4 cursor-pointer"
        >
            Sign-in
        </button>
        <p class="text-center">
            Don't have an account? <a href="/signup" class="text-red-800 font-bold">Register</a> now!
        </p>
        <a
            href="/forgot-password"
            class="text-red-800 text-center font-bold"
        >
            Forgot Password
        </a>
        </div>
    </div>
    <div
        style="background-image: url('{graduatesBg}')"
        class="hidden md:block md:w-1/2 bg-red-500 h-full bg-center bg-no-repeat bg-cover flex items-center content-center"
    >
        <div class="flex flex-col items-center text-white">
            <img src={logoWhite} class="w-32" alt="etrace-logo-white">
            <h1 class="text-4xl font-bold">E-trace</h1>
            <h2 class="text-lg">Opportunities Starts Here</h2>
        </div>
    </div>
</form>