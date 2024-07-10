<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Background from "$lib/background.svelte";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import Footer from "$lib/footer.svelte";

	let { data } = $props();

	let title = $state("");
	let author = $state("");
	let content = $state("");
	let selection = $state("");

	async function getWSI() {
		const result = await (await fetch(`/api/wsi_get/${selection}`)).json();
		title = result.wsi.title ?? "";
		author = result.wsi.author ?? "";
		content = result.wsi.content ?? "";
	}
</script>

<svelte:head>
	<title>Modify Information - DrownSafe</title>
</svelte:head>

<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>
<Background></Background>

<div
	class="flex flex-col mx-7 md:mx-20 my-7 bg-white bg-opacity-70 text-xl p-10 font-semibold rounded-3xl"
>
	<div class="text-4xl text-center font-bold mb-12">Modify Water Safety Information</div>

	<div class="flex flex-col items-center justify-center">
		<select
			class="mb-5 select-lg items-center select select-primary"
			bind:value={selection}
			onchange={getWSI}
		>
			<option value="">--</option>
			{#each data.wsi as einWSI}
				<option value={einWSI.id}>{einWSI.title}</option>
			{/each}
		</select>

		<form method="post" class="mb-5" action="?/deletePost">
			<input type="text" name="id" bind:value={selection} class="hidden" />
			<input type="submit" value="DELETE" class="btn btn-error" />
		</form>
	</div>

	<form
		use:enhance
		method="post"
		class="grid grid-cols-1 md:grid-cols-[1fr_5fr] items-center text-left md:text-right gap-7"
		enctype="multipart/form-data"
		action="?/modify"
	>
		<div class="required">Title</div>
		<input
			type="text"
			name="title"
			bind:value={title}
			required
			class="flex input input-primary w-full text-xl"
		/>

		<div class="required">Author</div>
		<input
			type="text"
			name="author"
			bind:value={author}
			required
			class="flex input input-primary w-full text-xl"
		/>

		<div>Upload New Image</div>
		<input type="file" name="image" accept="image/*" class="flex file-input input-primary w-full" />

		<div class="required self-start mt-2">Content</div>
		<textarea
			required
			name="content"
			class="textarea textarea-primary w-full font-normal text-xl"
			rows="10">{content}</textarea
		>

		<input type="text" name="id" bind:value={selection} class="hidden" />

		<div class="hidden md:block"></div>
		<div class="items-center justify-center text-center">
			<input type="submit" class="w-full btn btn-primary" />
		</div>
		{#if $page.form?.message}
			<div
				class="md:col-span-2 {200 <= $page.status && $page.status <= 299
					? 'text-success'
					: 'text-error'} font-semibold py-2 text-center"
			>
				{$page.form?.message}
			</div>
		{/if}
	</form>
</div>
<Footer></Footer>
