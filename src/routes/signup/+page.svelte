<script>
    import Header from "$lib/components/grouped/global/Header.svelte";
    import cctBg from "$lib/assets/cct-bg.jpg"
	import SignupForm from "$lib/components/grouped/global/SignupForm.svelte";
</script>

<div
    style="background-image: url('{cctBg}')"
    class="
    w-full h-full bg-[url(../assets/cct-bg.jpg)]
    overflow-x-hidden overflow-y-auto p-8 bg-white/75
    space-y-8 items-center flex flex-col
    bg-center bg-no-repeat bg-cover"
>
    <Header></Header>
    <SignupForm></SignupForm>
</div>