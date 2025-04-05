# Directus Shares Implementation

## Overview
Our application uses Directus's shares feature to provide secure, token-based access to quotes. This allows us to share quotes with clients without requiring them to log in to the system.

## Implementation Details

### Share Creation
1. When a quote is created in Directus, a share link is generated
2. The share link contains a unique token that grants access to the specific quote
3. The share can be configured with:
   - Password protection
   - Expiration date
   - Usage limits

### Access Flow
1. User visits `/quote/[token]` with their share token
2. The application:
   - Authenticates the share using `authenticateShare(token)`
   - Receives an access token if authentication is successful
   - Uses the access token to fetch the quote data
   - Displays the quote in a clean, organized layout

### Security Features
- Each share has a unique token
- Access tokens are temporary and can be revoked
- Shares can be password protected
- Shares can expire after a set date
- Usage can be limited to a specific number of views

### Data Structure
The quote data includes:
- Basic information (quote number, client, status)
- Event timeline (prep, load-in, show times, load-out)
- Logistics (room, parking, schedule)
- Financial details (subtotal, tax, total)
- Additional information and documents

## Technical Implementation

### Helper Functions
```javascript
// Authenticate share and get quote
export async function getQuoteByToken(id) {
    const directus = getDirectusInstance(fetch);
    try {
        // Authenticate the share
        const authResult = await directus.request(authenticateShare(id));
        
        if (!authResult?.access_token) {
            return null;
        }
        
        // Create authenticated client
        const shareClient = getShareDirectusQuote(fetch, authResult.access_token, authResult.item);
        
        return shareClient;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}
```

### Route Structure
- `/quote/[token]` - Handles share-based quote access
- Uses SvelteKit's dynamic routing
- Implements proper error handling for invalid tokens

## Best Practices
1. Always validate share tokens before displaying data
2. Handle authentication errors gracefully
3. Use proper TypeScript types for better code safety
4. Implement proper error boundaries
5. Cache share authentication results when appropriate

## Future Improvements
- Add share usage tracking
- Implement share revocation
- Add share analytics
- Support for multiple quote sharing
- Enhanced security features 