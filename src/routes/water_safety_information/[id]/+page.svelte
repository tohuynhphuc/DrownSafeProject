<script lang="ts">
	import Background from "$lib/background.svelte";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import Footer from "$lib/footer.svelte";

	let { data } = $props();
</script>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>
{#if data.wsi}
	<div class="flex flex-col justify-center items-center mx-5 xl:mx-20">
		<div
			class="flex flex-col items-center justify-center w-full gap-10 bg-white bg-opacity-80 my-14 py-7 xl:py-14 px-7 xl:px-14 rounded-2xl"
		>
			<div class="flex flex-col xl:flex-row justify-start gap-3 xl:gap-10 w-full">
				<img src="/api/wsi_image/{data.wsi.id}" class="size-32 object-cover" alt="" />
				<div class="flex flex-col gap-3">
					<div class="text-4xl font-bold">{data.wsi.title}</div>
					<div class="text-2xl font-semibold">Author: {data.wsi.author}</div>
				</div>
			</div>
			<div class="text-left text-xl w-full leading-relaxed">
				{@html data.wsi.content?.replaceAll("\n", "<br>")}
			</div>
			<a href="/water_safety_information" class="btn btn-primary px-12 h-14 text-xl">Back</a>
		</div>
	</div>
{:else}
	<div class="text-3xl text-error flex flex-col justify-center items-center p-20">
		<div
			class="flex flex-col items-center justify-center gap-10 bg-white bg-opacity-70 w-[80%] py-20 text-center font-bold rounded-2xl"
		>
			<div>Page not found...</div>
			<a href="/water_safety_information" class="btn btn-primary px-12 h-14 text-xl">Back</a>
		</div>
	</div>
{/if}

<Footer></Footer>
