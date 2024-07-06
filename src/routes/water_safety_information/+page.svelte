<script>
	import Background from "$lib/background.svelte";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import Footer from "$lib/footer.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>Water Safety Information - DrownSafe</title>
</svelte:head>

<Background></Background>
<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="flex flex-col my-5 gap-5 mx-20">
	<div
		class="grid grid-cols-[1fr_3fr] gap-6 bg-white bg-opacity-80 hover:bg-opacity-90 px-20 py-5 rounded-3xl"
	>
		<div class="flex flex-row">
			<img src="drown.png" alt="" class="h-64" />
		</div>
		<div class="flex flex-col w-full text-2xl my-12 leading-loose">
			<div class="text-3xl font-semibold">Drowning Statistics for 2023</div>
			<div>Author: Administration</div>
		</div>
	</div>

	<div
		class="grid grid-cols-[1fr_3fr] gap-6 bg-white bg-opacity-80 hover:bg-opacity-90 px-20 py-5 rounded-3xl"
	>
		<div class="flex flex-row">
			<img src="cpr.png" alt="" class="h-64" />
		</div>
		<div class="flex flex-col w-full text-2xl my-12 leading-loose">
			<div class="text-3xl font-semibold">First Aid Basics for Beginners</div>
			<div>Author: WHO</div>
		</div>
	</div>

	<div
		class="grid grid-cols-[1fr_3fr] gap-6 bg-white bg-opacity-80 hover:bg-opacity-90 px-20 py-5 rounded-3xl"
	>
		<div class="flex flex-row">
			<img src="cpr (1).png" alt="" class="h-64" />
		</div>
		<div class="flex flex-col w-full text-2xl my-12 leading-loose">
			<div class="text-3xl font-semibold">
				Life-Saving Tips Everyone Should Know to Prevent Drowning and this is very long to test how
				it looks in the website
			</div>
			<div>Author: VGU Admin</div>
		</div>
	</div>
</div>

<Footer></Footer>
