<script>
    import Header from "$lib/components/grouped/Header.svelte";
    import cctBg from "$lib/assets/cct-bg.jpg"
</script>

<div
style="background-image: url('{cctBg}')"
class="w-full h-full flex flex-col items-center bg-[url(../assets/cct-bg.jpg)]">
    <div class="w-full h-full p-8 bg-white/75 flex flex-col items-center">
        <Header></Header>
    </div>
</div>