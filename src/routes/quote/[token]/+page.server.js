import { error } from '@sveltejs/kit';
import { getQuoteByToken } from '$lib/directusHelpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const quote = await getQuoteByToken(params.token);
        
        if (!quote) {
            throw error(404, 'Quote not found or access denied');
        }
        
        return {
            quote
        };
    } catch (err) {
        console.error('Error loading quote:', err);
        throw error(500, 'Error loading quote');
    }
} 