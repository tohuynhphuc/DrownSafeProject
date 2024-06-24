<script>
	import Navbar from "$lib/navbar.svelte";

</script>
<Navbar></Navbar>

<div class="flex flex-col items-center justify-center gap-6 mt-10">
    <div class="text-5xl">Create New Account</div>
    <div class="grid grid-cols-2 gap-6">
        <div>
            <div class="text-xl">FULL NAME</div>
            <div class="h-2"></div>
            <input type="text" class="input input-primary">
        </div>
        <div>
            <div class="text-xl">DATE OF BIRTH</div>
            <div class="h-2"></div>
            <input type="text" class="input input-primary">
        </div>
        <div>
            <div class="text-xl">STUDENT ID</div>
            <div class="h-2"></div>
            <input type="text" class="input input-primary">
        </div>
        <div>
            <div class="text-xl">EMAIL</div>
            <div class="h-2"></div>
            <input type="text" class="input input-primary">
        </div>
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
        <div class="col-span-2 flex items-center justify-center">
            <button class="btn btn-primary w-[13.5rem]">Register</button>
        </div>
        <!--
        <div>
            <div class="text-xl">CONFIRM PASSWORD</div>
            <div class="h-2"></div>
            <input type="password" class="input input-primary">
        </div>
        -->
    </div>
</div>

