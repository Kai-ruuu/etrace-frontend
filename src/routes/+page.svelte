<script>
    import cctBg from "$lib/assets/cct-bg.jpg"
    import Header from "$lib/components/grouped/Header.svelte";
    import SigninForm from "$lib/components/grouped/SigninForm.svelte";
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
    <SigninForm></SigninForm>
</div>