import { createDirectus, rest, staticToken, readItem } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';

// Public instance for unauthenticated requests
export function getDirectusInstance(fetch) {
  	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(PUBLIC_APIURL, options).with(rest());
	return directus;
}

// Authenticated instance for share access
export async function getShareDirectusQuote(fetch, token, shareId) {
    const options = fetch ? { globals: { fetch } } : {};
    const directus = createDirectus(PUBLIC_APIURL, options)
        .with(rest())
        .with(staticToken(token));

	console.log("Share ID:", shareId);
	const quote =  await directus.request(readItem('flex_quotes', shareId));
	console.log("Quote:", quote);
    return quote;
}