<script lang="ts">
	import Background from '$lib/background.svelte';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';

	let { data } = $props();
</script>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>
{#if data.wsi}
	<div class="mx-5 flex flex-col items-center justify-center xl:mx-20">
		<div
			class="bg-opacity-80 my-14 flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-white px-7 py-7 xl:px-14 xl:py-14"
		>
			<div class="flex w-full flex-col justify-start gap-3 xl:flex-row xl:gap-10">
				<img src="/api/wsi_image/{data.wsi.id}" class="size-32 object-cover" alt="" />
				<div class="flex flex-col gap-3">
					<div class="text-4xl font-bold">{data.wsi.title}</div>
					<div class="text-2xl font-semibold">Author: {data.wsi.author}</div>
				</div>
			</div>
			<div class="w-full text-left text-xl leading-relaxed">
				{@html data.wsi.content?.replaceAll('\n', '<br>')}
			</div>
			<a href="/water_safety_information" class="btn h-14 px-12 text-xl btn-primary">Back</a>
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center justify-center p-20 text-3xl text-error">
		<div
			class="bg-opacity-70 flex w-4/5 flex-col items-center justify-center gap-10 rounded-2xl bg-white py-20 text-center font-bold"
		>
			<div>Page not found...</div>
			<a href="/water_safety_information" class="btn h-14 px-12 text-xl btn-primary">Back</a>
		</div>
	</div>
{/if}

<Footer></Footer>
