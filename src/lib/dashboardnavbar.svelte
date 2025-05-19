<script lang="ts">
	import { admin } from './const';
	let { username, name }: { username: string | undefined; name: string | undefined } = $props();
</script>

<div class="bg-opacity-100 z-50 bg-blue-100 px-7 py-7 text-xl md:px-20">
	<div class="z-50 flex flex-row items-center justify-between">
		<a href="/" class="z-50 flex flex-row items-center gap-2">
			<img src="/favicon.png" alt="Icon" class="z-50 size-16 sm:size-12" />
			<div class="hidden text-2xl sm:block"><b>DROWNSAFE</b></div>
		</a>
		{#if name}
			<div class="z-50 flex flex-col items-end">
				<div class="peer z-50">
					<div
						class="z-50 flex flex-row items-end justify-center gap-3 rounded-2xl border-2 border-red-500 bg-blue-300 py-2 pr-6 pl-4 shadow-xl hover:bg-blue-400"
					>
						<img src="/avatar.png" alt="" class="z-50 size-8" />
						Hello {name}
						<img src="/down.png" alt="" class="z-50 mb-[0.36rem] size-3" />
					</div>
				</div>
				<div class="absolute z-50 mt-[3.25rem] hidden peer-hover:block hover:block">
					<div class="z-50 flex flex-col gap-2 rounded-2xl bg-blue-50 p-2 shadow-xl">
						<a href="/login" class="flex flex-row items-center">
							<div
								class="z-50 flex w-full flex-row items-center justify-start rounded-2xl pl-2 hover:bg-red-100"
							>
								<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
									<img src="/dashboard.png" alt="" class="inline size-5" />
								</div>
								<div class="p-2">Dashboard</div>
							</div>
						</a>
						<a href="/water_safety_information" class="flex flex-row items-center">
							<div
								class="z-50 flex w-full flex-row items-center justify-start rounded-2xl pl-2 hover:bg-yellow-100"
							>
								<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
									<img src="/info.png" alt="" class="inline size-5" />
								</div>
								<div class="p-2">Water Safety Information</div>
							</div>
						</a>
						{#if username === admin}
							<a href="/admin_dashboard/wsi/add" class="flex flex-row items-center">
								<div
									class="z-50 flex w-full flex-row items-center justify-start rounded-2xl pl-2 hover:bg-blue-100"
								>
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
										<img src="/add.png" alt="" class="inline size-5" />
									</div>
									<div class="p-2">Add Information</div>
								</div>
							</a>

							<a href="/admin_dashboard/wsi/modify" class="flex flex-row items-center">
								<div
									class="z-50 flex w-full flex-row items-center justify-start rounded-2xl pl-2 hover:bg-purple-100"
								>
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
										<img src="/pencil.png" alt="" class="inline size-5" />
									</div>
									<div class="p-2">Modify Information</div>
								</div>
							</a>
						{/if}
						<div class=" z-50 rounded-2xl hover:bg-green-100">
							<a href="/api/logout/" class="ml-2 flex flex-row items-center">
								<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
									<img src="/logout.png" alt="" class="inline size-5" />
								</div>
								<div class="p-2">Log Out</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="z-50 flex items-center gap-1 xl:gap-10">
				<a href="/register">Sign Up</a>
				<a
					href="/login"
					class="btn bg-customblue hover:bg-custombluedark z-50 h-16 w-24 rounded-3xl text-xl text-white xl:w-44"
					>Log In</a
				>
			</div>
		{/if}
	</div>
</div>
