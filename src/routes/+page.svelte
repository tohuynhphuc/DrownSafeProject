<script>
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import Footer from "$lib/footer.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>DrownSafe</title>
</svelte:head>

<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="bg-customlav">
	<div class="flex flex-col justify-between gap-5 text-xl py-14 px-5 xl:px-20 xl:flex-row">
		<div class="flex flex-col gap-10">
			<div class="text-7xl"><b>Water Safety & Beyond</b></div>
			<div class="mt-3">
				Our mission is to prevent VGU members from being drown by falling into the Sunrise River
			</div>
			<a
				href="/register"
				class="btn bg-customyellow w-44 h-16 xl:mt-16 rounded-3xl text-xl hover:bg-customyellowdark"
				>Get Started</a
			>
		</div>
		<div class="w-full">
			<img src="/vgu.jpg" alt="VGU Campus with the Sunrise River" class="rounded-2xl" />
		</div>
	</div>
</div>

<div class="bg-customgreen">
	<div class="flex flex-col items-center justify-center py-14 px-5 xl:px-20 xl:flex-row">
		<iframe
			width="784"
			height="441"
			src="https://www.youtube.com/embed/DMz_rT_3TLI?si=yrySs3oHKlggoGPd"
			title="DrownSafe Demo Video"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
</div>

<div class="flex flex-wrap flex-row py-20 px-5 xl:px-20 gap-y-10 justify-around items-center">
	<img class="h-12" src="/logo/vgu-logo.png" alt="Vietnamesisch-Deutsche Universität" />
	<img class="h-28" src="/logo/chuthapdo.jpg" alt="Vietnam Red Cross Society" />
	<img class="h-12" src="/logo/swimvietnam.png" alt="Swim Vietnam" />
	<img
		class="h-28"
		src="/logo/mrcc.png"
		alt="Vietnam Marinetime search and Rescue Coordination Center"
	/>
</div>

<div>
	<div
		class="flex flex-col xl:flex-row gap-10 xl:gap-0 text-xl py-14 px-5 xl:px-20 justify-around items-center"
	>
		<div class="flex flex-col items-center gap-5 w-60 text-center">
			<img src="/notification.png" alt="" class="size-20" />
			<div><b>Best Quality Service</b></div>
			<div>Speedy alert, ensuring no one will be in danger.</div>
		</div>

		<div class="flex flex-col items-center gap-5 w-60 text-center">
			<img src="/news.png" alt="" class="size-20" />
			<div><b>Up-to-date News</b></div>
			<div>Rapid updates of news from the admin and our team.</div>
		</div>

		<div class="flex flex-col items-center gap-5 w-60 text-center">
			<img src="/helpline.png" alt="" class="size-20" />
			<div><b>Helpful Aid Hotlines</b></div>
			<div>Your problems will be solved within a blink of an eye.</div>
		</div>

		<div class="flex flex-col items-center gap-5 w-60 text-center">
			<img src="/maintenance.png" alt="" class="size-20" />
			<div><b>User-Driven Maintenance</b></div>
			<div>We listen to your feedback to improve and adapt the service.</div>
		</div>
	</div>
</div>

<div class="bg-custombluelight">
	<div class="flex flex-col justify-between gap-5 text-xl py-14 px-5 xl:px-32 xl:flex-row">
		<div class="flex flex-col gap-10 w-[100%]">
			<div class="text-7xl"><b>Let's Talk!</b></div>
			<div class="mt-3 leading-relaxed text-gray-400">
				You can ask us questions about our service, and we will be happy to answer you!
			</div>
			<a
				href="#footer"
				class="btn bg-customyellow w-44 h-16 xl:mt-10 rounded-3xl text-xl hover:bg-customyellowdark"
				>Contact Us</a
			>
		</div>
		<div class="w-[100%]">
			<img src="/dogswim.jpeg" alt="Swimming Dog" class="rounded-2xl" />
		</div>
	</div>
</div>

<div class="bg-custompurple">
	<div
		class="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-20 items-center justify-center py-14 px-5 xl:px-20 xl:mx-36 text-2xl leading-relaxed"
	>
		<div class="">
			<img src="/nhatminh.jpg" alt="Trần Ninh Nhật Minh" class="rounded-full w-full" />
		</div>
		<div class="flex flex-col">
			<img src="/quote.png" alt="" class="w-32" />
			<div>
				<b>
					We always strive for the safety of everyone. Sunrise river constitutes a beautiful element
					that complements our campus’s view perfectly. At the same time, it can be a dangerous
					natural feature where drowning cases occur. Bearing in mind that, we come up with this
					solution!
				</b>
			</div>
			<div class="text-gray-500 text-xl mt-10">Trần Ninh Nhật Minh</div>
		</div>
	</div>
</div>

<div id="footer">
	<Footer></Footer>
</div>
