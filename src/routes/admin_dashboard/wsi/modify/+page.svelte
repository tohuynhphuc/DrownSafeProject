<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';
	import { z } from 'zod/v4';

	let { data } = $props();

	let title = $state('');
	let author = $state('');
	let content = $state('');
	let selection = $state('');

	const schema = z.object({
		wsi: z.object({
			id: z.string(),
			title: z.string(),
			author: z.string(),
			content: z.string()
		})
	});

	async function getWSI() {
		const result = schema.parse(await (await fetch(`/api/wsi_get/${selection}`)).json());
		title = result.wsi.title ?? '';
		author = result.wsi.author ?? '';
		content = result.wsi.content ?? '';
	}
</script>

<svelte:head>
	<title>Modify Information - DrownSafe</title>
</svelte:head>

<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>
<Background></Background>

<div
	class="bg-opacity-70 mx-7 my-7 flex flex-col rounded-3xl bg-white p-10 text-xl font-semibold md:mx-20"
>
	<div class="mb-12 text-center text-4xl font-bold">Modify Water Safety Information</div>

	<div class="flex flex-col items-center justify-center">
		<select
			class="select mb-5 items-center select-lg select-primary"
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
		class="grid grid-cols-1 items-center gap-7 text-left md:grid-cols-[1fr_5fr] md:text-right"
		enctype="multipart/form-data"
		action="?/modify"
	>
		<div class="required">Title</div>
		<input
			type="text"
			name="title"
			bind:value={title}
			required
			class="input flex w-full text-xl input-primary"
		/>

		<div class="required">Author</div>
		<input
			type="text"
			name="author"
			bind:value={author}
			required
			class="input flex w-full text-xl input-primary"
		/>

		<div>Upload New Image</div>
		<input type="file" name="image" accept="image/*" class="file-input flex w-full input-primary" />

		<div class="required mt-2 self-start">Content</div>
		<textarea
			required
			name="content"
			class="textarea w-full text-xl font-normal textarea-primary"
			rows="10">{content}</textarea
		>

		<input type="text" name="id" bind:value={selection} class="hidden" />

		<div class="hidden md:block"></div>
		<div class="items-center justify-center text-center">
			<input type="submit" class="btn w-full btn-primary" />
		</div>
		{#if page.form?.message}
			<div
				class="md:col-span-2 {200 <= page.status && page.status <= 299
					? 'text-success'
					: 'text-error'} py-2 text-center font-semibold"
			>
				{page.form?.message}
			</div>
		{/if}
	</form>
</div>
<Footer></Footer>
