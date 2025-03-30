import { error } from '@sveltejs/kit';
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
    const directus = getDirectusInstance(fetch);
    
    try {
        const articles = await directus.request(readItems('posts', {
            filter: {
                slug: {
                    _eq: params.slug
                }
            },
            fields: [
                'id',
                'title',
                'slug',
                'status',
                'published_at',
                'description',
                'author',
                'image.*',
                'content'
            ]
        }));

        if (!articles || articles.length === 0) {
            throw error(404, 'Article not found');
        }

        return {
            article: articles[0]
        };
    } catch (err) {
        console.error('Error fetching article:', err);
        throw error(500, 'Error loading article');
    }
}
