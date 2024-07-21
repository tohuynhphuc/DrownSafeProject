<script lang="ts">
	import { admin } from "./const";
	let { username, name }: { username: string | undefined; name: string | undefined } = $props();
</script>

<div class="text-xl py-7 px-7 bg-blue-100 md:px-20 z-50 bg-opacity-100">
	<div class="flex flex-row justify-between items-center z-50">
		<a href="/" class="flex flex-row items-center gap-2 z-50">
			<img src="/favicon.png" alt="Icon" class="size-16 sm:size-12 z-50" />
			<div class="hidden sm:block text-2xl"><b>DROWNSAFE</b></div>
		</a>
		{#if name}
			<div class="flex flex-col items-end z-50">
				<div class="peer z-50">
					<div
						class="flex flex-row items-end justify-center gap-3 py-2 pl-4 pr-6 border-2 border-red-500 shadow-xl rounded-2xl bg-blue-300 hover:bg-blue-400 z-50"
					>
						<img src="/avatar.png" alt="" class="size-8 z-50" />
						Hello {name}
						<img src="/down.png" alt="" class="size-3 mb-[0.36rem] z-50" />
					</div>
				</div>
				<div class="peer-hover:block hidden absolute hover:block mt-[3.25rem] z-50">
					<div class="flex flex-col gap-2 shadow-xl p-2 rounded-2xl bg-blue-50 z-50">
						<a href="/login" class="flex flex-row items-center">
							<div
								class="flex flex-row items-center justify-start hover:bg-red-100 rounded-2xl z-50 pl-2 w-full"
							>
								<div class="flex items-center justify-center bg-gray-300 w-9 h-9 rounded-full">
									<img src="/dashboard.png" alt="" class="size-5 inline" />
								</div>
								<div class="p-2">Dashboard</div>
							</div>
						</a>
						<a href="/water_safety_information" class="flex flex-row items-center">
							<div
								class="flex flex-row items-center justify-start hover:bg-yellow-100 rounded-2xl z-50 pl-2 w-full"
							>
								<div class="flex items-center justify-center bg-gray-300 w-9 h-9 rounded-full">
									<img src="/info.png" alt="" class="size-5 inline" />
								</div>
								<div class="p-2">Water Safety Information</div>
							</div>
						</a>
						{#if username === admin}
							<a href="/admin_dashboard/wsi/add" class="flex flex-row items-center">
								<div
									class="flex flex-row items-center justify-start hover:bg-blue-100 rounded-2xl z-50 pl-2 w-full"
								>
									<div class="flex items-center justify-center bg-gray-300 w-9 h-9 rounded-full">
										<img src="/add.png" alt="" class="size-5 inline" />
									</div>
									<div class="p-2">Add Information</div>
								</div>
							</a>

							<a href="/admin_dashboard/wsi/modify" class="flex flex-row items-center">
								<div
									class="flex flex-row items-center justify-start hover:bg-purple-100 rounded-2xl z-50 pl-2 w-full"
								>
									<div class="flex items-center justify-center bg-gray-300 w-9 h-9 rounded-full">
										<img src="/pencil.png" alt="" class="size-5 inline" />
									</div>
									<div class="p-2">Modify Information</div>
								</div>
							</a>
						{/if}
						<div class=" hover:bg-green-100 rounded-2xl z-50">
							<a href="/api/logout/" class="flex flex-row items-center ml-2">
								<div class="flex items-center justify-center bg-gray-300 w-9 h-9 rounded-full">
									<img src="/logout.png" alt="" class="size-5 inline" />
								</div>
								<div class="p-2">Log Out</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex gap-1 items-center xl:gap-10 z-50">
				<a href="/register">Sign Up</a>
				<a
					href="/login"
					class="btn text-xl bg-customblue text-white w-24 h-16 rounded-3xl hover:bg-custombluedark xl:w-44 z-50"
					>Log In</a
				>
			</div>
		{/if}
	</div>
</div>
