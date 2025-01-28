import { PUBLIC_APIURL } from '$env/static/public';
import { readItems, readFiles } from '@directus/sdk';
import getDirectusInstance from './directus';

export function makeURL(filename) {
    // console.log("Making a url", filename);
	return PUBLIC_APIURL + "/assets/" + filename;
}

export async function getFolderPhotos(folderName) {
    const directus = getDirectusInstance(fetch);
    return directus.request(readFiles({
        filter: {
            folder: {
                name: {
                    _eq: folderName
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

export async function getPages() {
    const directus = getDirectusInstance(fetch);
    return directus.request(readItems('pages', {
        fields: [
            'id',
            'title',
            'permalink',
            'status',
            'published_at',
            'blocks.*',
            'description'
        ]
    }));
}

export async function getNavItems() {
    const directus = getDirectusInstance(fetch);
    return directus.request(readItems('navigation', {
        fields: [
            'id',
            'title',
            'items.*'
        ]
    }));
}