<script>
	import Navbar from "$lib/navbar.svelte";

</script>
<Navbar></Navbar>

<div class="flex flex-col items-center justify-center gap-6 mt-10">
    <div class="text-5xl">Login</div>
    <div class="flex flex-col gap-6">
        <div>
            <div class="text-xl">USERNAME</div>
            <div class="h-2"></div>
            <input type="text" class="input input-primary">
        </div>
        <div>
            <div class="text-xl">PASSWORD</div>
            <div class="h-2"></div>
            <input type="password" class="input input-primary">
        </div>
        <button class="btn btn-primary w-full">Log in</button>
    </div>
</div>

