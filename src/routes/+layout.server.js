/** @type {import('./$types').LayoutServerLoad} */
import getDirectusInstance from '$lib/directus';
import { getHeroPhotos } from '$lib/directusHelpers';
import { readItems } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		global: await directus.request(readItems('globals', {
			fields: [
				'title',
				'url',
				'logo.*',
				'favicon.*',
				'tagline',
				'description',
				'social_links'
			]
		})),
		heroPhotos: await getHeroPhotos(),
	};
}