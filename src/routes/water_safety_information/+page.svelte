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
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="flex flex-col my-5 gap-5 mx-5 xl:mx-20">
	{#each data.wsi as einWSI}
		<a
			href="./{einWSI.id}"
			class="grid grid-cols-1 xl:grid-cols-[1fr_3fr] xl:gap-6 bg-white bg-opacity-80 hover:bg-opacity-90 px-7 xl:px-20 py-5 xl:py-8 rounded-3xl"
		>
			<div class="flex flex-row">
				<img src="/api/wsi_image/{einWSI.id}" alt="" class="size-32 xl:size-64 object-cover" />
			</div>
			<div class="flex flex-col w-full text-2xl my-3 xl:my-12 leading-loose">
				<div class="text-3xl font-semibold">{einWSI.title}</div>
				<div>Author: {einWSI.author}</div>
			</div>
		</a>
	{/each}
</div>

<Footer></Footer>
