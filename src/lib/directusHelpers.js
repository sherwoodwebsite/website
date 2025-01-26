import { PUBLIC_APIURL } from '$env/static/public';
import { readItems, readFiles } from '@directus/sdk';
import getDirectusInstance from './directus';

export function makeURL(filename) {
    // console.log("Making a url", filename);
	return PUBLIC_APIURL + "/assets/" + filename;
}

export async function getHeroPhotos() {
    const directus = getDirectusInstance(fetch);
    return directus.request(readFiles({
        filter: {
            folder: {
                name: {
                    _eq: 'hero_photos'
                }
            }
        },
        fields: [
            'id',
            'filename_disk',
            'width',
            'height'
        ]
    }));
}