<script>
	import Background from '$lib/background.svelte';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Water Safety Information - DrownSafe</title>
</svelte:head>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="mx-5 my-5 flex flex-col gap-5 xl:mx-20">
	{#each data.wsi as einWSI}
		<a
			href="./{einWSI.id}"
			class="bg-opacity-80 hover:bg-opacity-90 grid grid-cols-1 rounded-3xl bg-white px-7 py-5 xl:grid-cols-[1fr_3fr] xl:gap-6 xl:px-20 xl:py-8"
		>
			<div class="flex flex-row">
				<img src="/api/wsi_image/{einWSI.id}" alt="" class="size-32 object-cover xl:size-64" />
			</div>
			<div class="my-3 flex w-full flex-col text-2xl leading-loose xl:my-12">
				<div class="text-3xl font-semibold">{einWSI.title}</div>
				<div>Author: {einWSI.author}</div>
			</div>
		</a>
	{/each}
</div>

<Footer></Footer>
