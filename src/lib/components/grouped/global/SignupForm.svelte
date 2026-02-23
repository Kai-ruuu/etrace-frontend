<script>
    import logoWhite from "$lib/assets/logo-white.png"
    import graduatesBg from "$lib/assets/graduates-bg.jpg"
    import { user } from "$lib/stores/user"
	import { EmploymentStatus, role } from "$lib/constants/user";
	import { openIndexPage } from "$lib/helpers/user";
    import { signin, signupAsAlumni, signupAsCompany } from "$lib/client/authentication";
    import { GraduationCap, Mail, Lock, Circle, CircleCheck, User } from "lucide-svelte";
	import { Course } from "$lib/client/course";
	import { onMount } from "svelte";
	import { Occupation } from "$lib/client/occupation";
	import RegistrationFileField from "$lib/components/single/global/RegistrationFileField.svelte";

    let alumniFormData = $state({
        // personal information
        name_extension: { value: "", errors: [] },
        first_name: { value: "", errors: [] },
        middle_name: { value: "", errors: [] },
        last_name: { value: "", errors: [] },

        // contact information
        phone_number: { value: "", errors: [] },
        address: { value: "", errors: [] },
        socials: { value: [], errors: [] },
        
        // education information
        course_id: { value: 0, errors: [] },
        year_graduated: { value: (new Date()).getFullYear(), errors: [] },
        
        // employment information
        employment_status: { value: EmploymentStatus.EMPLOYED, errors: [] },
        occupations: { value: [], errors: [] },
        curriculum_vitae_file: { value: null, errors: [] },

        // e-trace account information
        profile_picture_file: { value: null, errors: [] },
        email: { value: "", errors: [] },
        password: { value: "", errors: [] },
        confirm_password: { value: "", errors: [] },
    });
    
    let companyFormData = $state({
        // company information
        name: { value: "", errors: [] },
        address: { value: "", errors: [] },

        // requirements
        logo_file: { value: null, errors: [] },
        sec_file: { value: null, errors: [] },
        profile_file: { value: null, errors: [] },
        business_permit_file: { value: null, errors: [] },
        list_of_vacancies_file: { value: null, errors: [] },
        cert_from_dole_file: { value: null, errors: [] },
        cert_of_no_pending_case_file: { value: null, errors: [] },
        reg_dti_cda_file: { value: null, errors: [] },
        reg_of_est_file: { value: null, errors: [] },
        reg_philjobnet_file: { value: null, errors: [] },

        // e-trace account information
        email: { value: "", errors: [] },
        password: { value: "", errors: [] },
        confirm_password: { value: "", errors: [] },
    });

    let courses = $state([]);
    let areCoursesReady = $state(false);

    let occupations = $state([]);
    let areOccupationsReady = $state(false);

    let isRegisteringAsAlumni = $state(true);

    let alumnicurrCat = $state(0);
    let alumniMaxCats = 5;
    let alumniSocialUrl = $state("");
    let alumniSocialPlat = $state("");

    let alumniOccTitle = $state("");
    let alumniOccLocation = $state("");
    let alumniOccIsCurrent = $state("");
    
    let companycurrCat = $state(0);
    let companyMaxCats = 3;

    async function fetchCourses() {
        const [status, data] = await Course.getAll();

        if (status === 200) {
            courses = data;

            if (courses?.length > 0) {
                alumniFormData.course_id.value = courses[0].id;
            }
        } else {
            alert(data?.detail ?? "Unable to fetch courses");
        }

        areCoursesReady = true;
    }

    async function fetchOccupations() {
        const [status, data] = await Occupation.getAll();

        if (status === 200) {
            occupations = data;
        } else {
            alert(data?.detail ?? "Unable to fetch occupations.")
        }

        areOccupationsReady = true;
    }

    onMount(async () => {
        await fetchCourses();
        await fetchOccupations();
    });
</script>

{#if areCoursesReady && areOccupationsReady}
    <div class="bg-white rounded-4xl md:w-2/3 min-h-112 flex overflow-hidden">
        <div class="md:w-1/2 flex flex-col items-stretch p-8 md:p-8 space-y-8 overflow-x-hidden overflow-y-auto">
            <form>
                <div class="">
                    <div class="flex flex-col items-stretch space-y-2">
                        <h1 class="text-center font-bold text-xl">E-trace Registration</h1>
                        <h2 class="text-center text-sm text-red-800">Create your own account.</h2>
                    </div>
                    <div class="flex flex-col items-stretch space-y-4">
                        {#if isRegisteringAsAlumni}
                            <!-- Personal Information -->
                            <div class={`${alumnicurrCat !== 0 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Personal Information</h1>
                                
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="name-extension"
                                        type="text"
                                        placeholder="Name Extension (optional)"
                                        bind:value={alumniFormData.name_extension.value}
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="first-name"
                                        type="text"
                                        placeholder="First Name"
                                        bind:value={alumniFormData.first_name.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="middle-name"
                                        type="text"
                                        placeholder="Middle Name (optional)"
                                        bind:value={alumniFormData.middle_name.value}
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="last-name"
                                        type="text"
                                        placeholder="Last Name"
                                        bind:value={alumniFormData.last_name.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                            </div>

                            <!-- Contact Information -->
                            <div class={`${alumnicurrCat !== 1 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Contact Information</h1>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="phone-number"
                                        type="text"
                                        placeholder="Phone Number"
                                        bind:value={alumniFormData.phone_number.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="Address"
                                        bind:value={alumniFormData.address.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch gap-y-4">
                                    <p>Social/s</p>
                                    {#if alumniFormData.socials.value.length > 0}
                                        <div class="flex flex-col items-stretch gap-y-4">
                                            {#each alumniFormData.socials.value as social}
                                                <div class="border border-gray-500 rounded-full p-4">
                                                    <p class="text-gray-500">{social.platform}: {social.url}</p>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                    <div class="flex flex-col items-stretch gap-y-4">
                                        <input
                                            id="platform"
                                            type="text"
                                            placeholder="Platform"
                                            bind:value={alumniSocialPlat}
                                            required
                                            class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                        >
                                        <input
                                            id="url"
                                            type="text"
                                            placeholder="URL"
                                            bind:value={alumniSocialUrl}
                                            required
                                            class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                        >
                                        <button
                                            onclick={() => alumniFormData.socials.value.push({ platform: alumniSocialPlat, url: alumniSocialUrl })}
                                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Educational Information -->
                            <div class={`${alumnicurrCat !== 2 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Educational Information</h1>

                                <div class="flex flex-col items-stretch gap-y-4">
                                    <p>Course</p>
                                    <select
                                        bind:value={alumniFormData.course_id.value}
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                        {#each courses as course}
                                            <option value={course.id}>{course.name}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="flex flex-col items-stretch relative">
                                    <p>Year Graduated</p>
                                    <input
                                        id="year-grduated"
                                        type="number"
                                        placeholder="Year Graduated"
                                        bind:value={alumniFormData.year_graduated.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                            </div>

                            <!-- Employment Information -->
                            <div class={`${alumnicurrCat !== 3 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Employment Information</h1>

                                <div class="flex flex-col items-stretch gap-y-4">
                                    <p>Employment Status</p>
                                    <select
                                        bind:value={alumniFormData.employment_status.value}
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                        {#each Object.values(EmploymentStatus) as status}
                                            <option value={status}>{status}</option>
                                        {/each}
                                    </select>
                                </div>
                                
                                <RegistrationFileField
                                    label="Curriculum Vitae (PDF)"
                                    accept=".pdf"
                                    bind:value={alumniFormData.curriculum_vitae_file.value}
                                />

                                <!-- Occupations Adding/Selection -->
                                {#if alumniFormData.employment_status.value !== EmploymentStatus.UNEMPLOYED}
                                    <div class="flex flex-col items-stretch gap-y-4">
                                        <p>Occupation/s</p>
                                        {#if alumniFormData.occupations.value.length > 0}
                                            <div class="flex flex-col items-stretch gap-y-4">
                                                {#each alumniFormData.occupations.value as occupation}
                                                    <div class="border border-gray-500 rounded-full p-4">
                                                        <p class="text-gray-500">{occupation.title}</p>
                                                    </div>
                                                {/each}
                                            </div>
                                        {/if}
                                        <div class="flex flex-col items-stretch gap-y-4">
                                            <input
                                                id="occupation"
                                                type="text"
                                                list="occupations"
                                                placeholder="Occupation"
                                                bind:value={alumniOccTitle}
                                                required
                                                class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                            >
                                            <datalist id="occupations">
                                                {#each occupations as occupation}
                                                    <option value={occupation.title}></option>
                                                {/each}
                                            </datalist>
                                            <input
                                                id="location"
                                                type="text"
                                                placeholder="Location"
                                                bind:value={alumniOccLocation}
                                                required
                                                class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                            >
                                            <div class="flex items-center gap-x-2">
                                                <input
                                                    bind:checked={alumniOccIsCurrent}
                                                    type="checkbox"
                                                    id="is-current"
                                                >
                                                <label for="is-current">Is Current Occupation</label>
                                            </div>
                                            <button
                                                onclick={() => alumniFormData.occupations.value.push({
                                                    title: alumniOccTitle,
                                                    location: alumniOccLocation,
                                                    is_current: alumniOccIsCurrent
                                                })}
                                                class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                {/if}
                            </div>

                            <!-- Account Information -->
                            <div class={`${alumnicurrCat !== 4 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">E-trace Account Information</h1>
                            
                                <RegistrationFileField
                                    label="Profile Picture (IMAGE)"
                                    accept=".png,.jpg,.jpeg"
                                    bind:value={alumniFormData.profile_picture_file.value}
                                />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    bind:value={alumniFormData.email.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    bind:value={alumniFormData.password.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >

                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    bind:value={alumniFormData.confirm_password.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >
                            </div>
                        {:else}
                            <!-- Company Information -->
                            <div class={`${companycurrCat !== 0 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Company Information</h1>
                                
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="company-name"
                                        type="text"
                                        placeholder="Company Name"
                                        required
                                        bind:value={companyFormData.name.value}
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                                <div class="flex flex-col items-stretch relative">
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="Address"
                                        bind:value={companyFormData.address.value}
                                        required
                                        class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                    >
                                </div>
                            </div>

                            <!-- Requirements -->
                            <div class={`${companycurrCat !== 1 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">Required Documents</h1>
                                
                                <RegistrationFileField
                                    label="Company Logo (IMAGE)"
                                    accept=".png,.jpg,.jpeg"
                                    bind:value={companyFormData.logo_file.value}
                                />
                                <RegistrationFileField
                                    label="SEC (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.sec_file.value}
                                />
                                <RegistrationFileField
                                    label="Company Profile (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.profile_file.value}
                                />
                                <RegistrationFileField
                                    label="Business Permit (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.business_permit_file.value}
                                />
                                <RegistrationFileField
                                    label="List of Vacancies (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.list_of_vacancies_file.value}
                                />
                                <RegistrationFileField
                                    label="Certification From DOLE Provincial Office (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.cert_from_dole_file.value}
                                />
                                <RegistrationFileField
                                    label="Certification of No Pending Case (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.cert_of_no_pending_case_file.value}
                                />
                                <RegistrationFileField
                                    label="DTI/CDA Reg. (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.reg_dti_cda_file.value}
                                />
                                <RegistrationFileField
                                    label="Registry of Establishment fr. DOLE (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.reg_of_est_file.value}
                                />
                                <RegistrationFileField
                                    label="Phil-JobNet Reg. (PDF)"
                                    accept=".pdf"
                                    bind:value={companyFormData.reg_philjobnet_file.value}
                                />
                            </div>

                            <!-- Account Information -->
                            <div class={`${companycurrCat !== 2 && "hidden"} flex flex-col items-stretch gap-y-4`}>
                                <h1 class="text-center mt-4">E-trace Account Information</h1>
                            
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    bind:value={companyFormData.email.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    bind:value={companyFormData.password.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >

                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    bind:value={companyFormData.confirm_password.value}
                                    required
                                    class="border-none bg-gray-100 rounded-full p-4 indent-2"
                                >
                            </div>
                        {/if}
                    </div>
                </div>
            </form>

            <!-- control buttons -->
            <div class="flex items-center justify-between gap-x-4">
                {#if isRegisteringAsAlumni}
                    {#if alumnicurrCat > 0}
                        <button
                            onclick={() => alumnicurrCat--}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Prev
                        </button>
                    {/if}
                    {#if alumnicurrCat < alumniMaxCats - 1}
                        <button
                            onclick={() => alumnicurrCat++}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Next
                        </button>
                    {/if}
                    {#if alumnicurrCat === alumniMaxCats - 1}
                        <button
                            onclick={async () => await signupAsAlumni(alumniFormData)}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Submit
                        </button>
                    {/if}
                {:else}
                    {#if companycurrCat > 0}
                        <button
                            onclick={() => companycurrCat--}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Prev
                        </button>
                    {/if}
                    {#if companycurrCat < companyMaxCats - 1}
                        <button
                            onclick={() => companycurrCat++}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Next
                        </button>
                    {/if}
                    {#if companycurrCat === companyMaxCats - 1}
                        <button
                            onclick={async () => await signupAsCompany(companyFormData)}
                            class="bg-red rounded-full bg-red-800 text-white py-4 cursor-pointer grow"
                        >
                            Submit
                        </button>
                    {/if}
                {/if}
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
                <br>
                <div class="w-full flex flex-col items-center gap-y-4">
                    <button
                        type="button"
                        onclick={() => isRegisteringAsAlumni = true}
                        class={(isRegisteringAsAlumni ? "bg-white" : "bg-white/25") + " cursor-pointer w-3/5 p-4 rounded-2xl flex items-center gap-x-4"}
                    >
                        <div class="bg-red-100 p-2 w-10 h-10 rounded-full flex items-center justify-center">
                            <User class="text-red-800" />
                        </div>
                        <div class="grow">
                            <h1 class={(isRegisteringAsAlumni ? "text-red-800" : "text-white") + " text-left font-bold"}>Sign-up as Alumni</h1>
                            <h2 class={(isRegisteringAsAlumni ? "text-gray-400" : "text-gray-200") + " text-left text-xs text-nowrap"}>Discover jobs & stay connected</h2>
                        </div>
                    </button>
                    <button
                        type="button"
                        onclick={() => isRegisteringAsAlumni = false}
                        class={(!isRegisteringAsAlumni ? "bg-white " : "bg-white/25") + " cursor-pointer w-3/5 p-4 rounded-2xl flex items-center gap-x-4"}
                    >
                        <div class="bg-red-100 p-2 w-10 h-10 rounded-full flex items-center justify-center">
                            <User class="text-red-800" />
                        </div>
                        <div class="grow">
                            <h1 class={(!isRegisteringAsAlumni ? "text-red-800" : "text-white") + " text-left font-bold"}>Sign-up as Company</h1>
                            <h2 class={(!isRegisteringAsAlumni ? "text-gray-400" : "text-gray-200") + " text-left text-xs text-nowrap"}>Post jobs & discover talents</h2>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}