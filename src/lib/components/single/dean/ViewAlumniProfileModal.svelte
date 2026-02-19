<script>
	import { MapPin, Plus, X } from "lucide-svelte";
	import ModalHeader from "../global/ModalHeader.svelte";
	import TextField from "../global/TextField.svelte";
	import Button from "../global/Button.svelte";
	import TransparentButton from "../global/TransparentButton.svelte";
	import { Course } from "$lib/client/course";
	import { GraduateRecord } from "$lib/client/graduate_record";
	import { onMount, tick } from "svelte";
	import { user } from "$lib/stores/user";
	import FileField from "../global/FileField.svelte";
	import { Alumni } from "$lib/client/alumni";
    import { browser } from "$app/environment";
	import LoadingAnimation from "../global/LoadingAnimation.svelte";
	import InfoText from "../alumni/InfoText.svelte";
	import { EmploymentStatus } from "$lib/constants/user";

    const {
        viewAlumniId = $bindable(null),
        exitHandler,
    } = $props()

    let mapContainer = $state(null)
    let alumni = $state(null)
    let isOccMapViewOpen = $state(false)
    let geocodingInfo = $state(null)

    async function geocodeOccupationLocation(occupation) {
        const [status, data] = await Alumni.getGeocodedOccLocation(occupation);

        if (status === 200) {
            geocodingInfo = data;

            if (!browser) return;

            await tick();
        
            const L = await import("leaflet");
            const { latitude, longitude } = geocodingInfo;
            const coords = [latitude, longitude];
            const map = L.map(mapContainer).setView(coords, 13);
        
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        
            L.marker(coords).addTo(map).openPopup();
        }

        return status
    }

    async function fetchAlumni() {
        const [status, data] = await Alumni.getById(viewAlumniId);

        if (status === 200) {
            alumni = data;
            // [debug]
            console.log(data);
        } else {
            alert("Unable to fetch alumni information.");
        }
    }

    async function handleMapView(occupation) {
        isOccMapViewOpen = true;

        await tick();

        const status = await geocodeOccupationLocation(occupation);

        if (status === 404) {
            alert("Address not found.");
        } else if (status !== 200) {
            alert("Unable to geocode address.");
        }
    }

    function handleModalExit() {
        if (isOccMapViewOpen) {
            isOccMapViewOpen = false;
        } else {
            exitHandler();
        }
    }

    function handleSocialVisit(e, social) {
        e.preventDefault();

        let url = social.url;
        
        if (!url.startsWith('https://')) {
            url = 'https://' + url;
        }

        window.open(url, '_blank');
    }
    
    onMount(fetchAlumni)
</script>

{#if alumni}
    <div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
        <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3 md:min-w-2/3">
            <ModalHeader title={geocodingInfo?.address ?? "Loading..."}>
                <TransparentButton onclick={() => handleModalExit()}>
                    <X class="w-5" />
                </TransparentButton>
            </ModalHeader>
            <div class="p-8 max-h-116 flex flex-col items-stretch space-y-3 overflow-y-auto">
                {#if isOccMapViewOpen}
                    {#if geocodingInfo}
                        <div bind:this={mapContainer} class="grow rounded-lg overflow-clip min-h-84"></div>
                    {/if}
                {:else}
                    <div class="flex flex-col items-stretch gap-y-8">
                        <!-- profile picture -->
                        <div class="flex items-center justify-center gap-x-8">
                            <div class="w-24 h-24 bg-red-500 rounded-full"></div>
                        </div>
                        <div class="flex">
                            <div class="space-y-4 flex flex-col items-stretch w-1/2">
                                <h1 class="font-bold text-red-800">Personal Information</h1>
                                <div class="grow gap-y-2 flex flex-col">
                                    <InfoText label="Name Extension" value={alumni.alumni_profile.name_extension}/>
                                    <InfoText label="Last Name" value={alumni.alumni_profile.last_name}/>
                                    <InfoText label="First Name" value={alumni.alumni_profile.first_name} />
                                    <InfoText label="Middle Name" value={alumni.alumni_profile.middle_name} />
                                </div>
                                <h1 class="font-bold text-red-800">Contact Information</h1>
                                <div class="grow gap-y-2 flex flex-col">
                                    <InfoText label="Phone Number" value={alumni.alumni_profile.phone_number} />
                                    <InfoText label="Email Address" value={alumni.email}/>
                                    <InfoText label="Address" value={alumni.alumni_profile.address} />
                                    {#if alumni.alumni_profile.socials.length > 0}
                                        <div class="flex flex-col items-stretch">
                                            <span class="text-nowrap text-sm text-gray-500">Social/s</span>
                                            {#each alumni.alumni_profile.socials as social }
                                                <div class="flex items-center justify-between">
                                                    <div class="flex flex-col">
                                                        <span class="font-bold text-gray-700">{social.platform}</span>
                                                        <a class="text-xs" href={social.url} onclick={(e) => handleSocialVisit(e, social)}>{social.url}</a>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            <div class="space-y-4 flex flex-col items-stretch w-1/2">
                                <h1 class="font-bold text-red-800">Educational Information</h1>
                                <div class="grow gap-y-2 flex flex-col">
                                    <InfoText label="Year Graduated" value={alumni.alumni_profile.year_graduated}/>
                                    <InfoText label="Course Taken" value={alumni.alumni_profile.course.name} />
                                    <!-- <InfoText label="" value={alumni.alumni_profile.middle_name} /> -->
                                </div>
                                <h1 class="font-bold text-red-800">Employment Information</h1>
                                <div class="grow gap-y-2 flex flex-col">
                                    <InfoText label="Employment Status" value={alumni.alumni_profile.employment_status} />

                                    <!-- display occupations if employed/self-employed -->
                                    {#if alumni.alumni_profile.employment_status !== EmploymentStatus.UNEMPLOYED}
                                        <div class="flex flex-col items-stretch">
                                            <span class="text-nowrap text-sm text-gray-500">Occupation/s</span>
                                            {#each alumni.alumni_profile.occupations.filter((o) => o.is_current) as occupation }
                                                <div class="flex items-center justify-between">
                                                    <div class="flex flex-col">
                                                        <span class="font-bold text-gray-700">{occupation.title}</span>
                                                        <span class="text-xs">{occupation.location}</span>
                                                    </div>
                                                    <Button onclick={async () => await handleMapView(occupation)}>
                                                        <MapPin class="w-5" />
                                                    </Button>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <div class="fixed top-0 left-0 w-screen h-screen z-100 bg-gray-50/75 flex items-center justify-center">
        <div class="shadow rounded-xl bg-white overflow-hidden flex flex-col items-stretch min-w-1/3 md:min-w-2/3">
            <ModalHeader title="Loading profile...">
                <TransparentButton onclick={exitHandler}>
                    <X class="w-5" />
                </TransparentButton>
            </ModalHeader>
            <div class="p-8 pt-4 min-h-102 flex items-center justify-center space-y-3">
                <LoadingAnimation />
            </div>
        </div>
    </div>
{/if}