import { PUBLIC_APIURL } from '$env/static/public';
import { readItems, readFiles, readItem, readShareInfo, authenticateShare } from '@directus/sdk';
import { getDirectusInstance, getShareDirectusQuote } from './directus';

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
            'slug',
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

export async function getQuoteByToken(id) {
    console.log("Getting quote by share id", id);
    const directus = getDirectusInstance(fetch);
    try {
        // First authenticate the share to get an access token
        const authResult = await directus.request(authenticateShare(id));
        console.log('Auth result:', authResult);
        
        if (!authResult?.access_token) {
            return null;
        }
        const shareInfo = await directus.request(readShareInfo(id));
        console.log('Share info:', shareInfo);
        
        // Create a new client instance with the share's access token
        const sharedQuote = getShareDirectusQuote(fetch, authResult.access_token, shareInfo.item);
        
        // Now we can use the share client to access the item
        // const quote = await shareClient.request(readItem('flex_quotes', authResult.item, {
        //     fields: [
        //         '*.*'
        //     ]
        // }));
        
        return sharedQuote;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}