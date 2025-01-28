<script>
	import { goto } from '$app/navigation';
	import HeroSlides from '$lib/layout/HeroSlides.svelte';
	import { makeURL } from '$lib/directusHelpers';

	let { data } = $props();
	
	// Transform the photos to include the full URL
	let photos = data.heroPhotos.map(photo => ({
		id: photo.id,
		url: makeURL(photo.filename_disk)
	}));

	function navigateToProd() {
		goto('production/contact');
	}

	function navigateToInstallations() {
		goto('installations/contact');
	}
</script>

<HeroSlides {photos} />
<div class="container">
	<h1>Technical support for the event and entertainment industry</h1>

	<div class="grid">
		<article>
			<h3>Event Production</h3>
			<p>From corporate events to music festivals, we will make your live event a success. Reach out to us today for a quote.</p>

			<button onclick={navigateToProd}>Contact Production</button>
		</article>
		<article>
			<h3>Installations</h3>
			<p>
				Sherwood can provide the installation of fully integrated multimedia systems that can be
				operated by anyone
			</p>
			<button onclick={navigateToInstallations}>Contact Installations</button>
		</article>
	</div>
</div>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		width: 300px;
		background: #f2682a;
		border: none;
	}

	button:hover {
		background: #c33d10;
	}
</style>
