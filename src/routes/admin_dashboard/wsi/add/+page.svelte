<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Add Information - DrownSafe</title>
</svelte:head>

<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>
<Background></Background>

<div class="bg-opacity-70 mx-7 my-7 rounded-3xl bg-white p-10 text-xl font-semibold md:mx-20">
	<div class="mb-12 text-center text-4xl font-bold">Add Water Safety Information</div>
	<form
		use:enhance
		method="post"
		class="grid grid-cols-1 items-center gap-7 text-left md:grid-cols-[1fr_5fr] md:text-right"
		enctype="multipart/form-data"
	>
		<div class="required">Title</div>
		<input type="text" name="title" required class="input input-primary flex w-full text-xl" />

		<div class="required">Author</div>
		<input type="text" name="author" required class="input input-primary flex w-full text-xl" />

		<div class="required">Upload Image</div>
		<input
			type="file"
			name="image"
			required
			accept="image/*"
			class="file-input input-primary flex w-full"
		/>

		<div class="required mt-2 self-start">Content</div>
		<textarea
			required
			name="content"
			class="textarea textarea-primary w-full text-xl font-normal"
			rows="10"
		></textarea>
		<div class="hidden md:block"></div>
		<div class="items-center justify-center text-center">
			<input type="submit" class="btn btn-primary w-full" />
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
