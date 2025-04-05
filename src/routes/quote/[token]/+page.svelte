<script>
  import { makeURL } from '$lib/directusHelpers';
  
  let { data } = $props();
  const quote = data.quote;
  
  // Parse the JSON strings
  const headerData = JSON.parse(quote.header_data);
  const customFields = JSON.parse(quote.custom_fields);
  const totals = JSON.parse(quote.totals);

  // Helper function to find custom field value
  function getCustomField(caption) {
    const field = customFields.find(f => f.caption === caption);
    return field?.storedValue || 'Not specified';
  }

  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  }

  // Format date/time
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Format dates
  const createdDate = quote.created_at ? 
    new Date(quote.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : null;
    
  const updatedDate = quote.updated_at ? 
    new Date(quote.updated_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : null;
</script>

<svelte:head>
  <title>Quote #{quote.document_number}</title>
</svelte:head>

<main>
  <article>
    <header>
      <h1>{quote.name}</h1>
      <p>Quote #{quote.document_number} • {quote.client_company}</p>
      <p><mark>{quote.status}</mark></p>
    </header>

    <section>
      <h2>Event Timeline</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Prep Date</th>
            <td>{formatDateTime(headerData.plannedStartDate.data)}</td>
          </tr>
          <tr>
            <th scope="row">Load In</th>
            <td>{formatDateTime(headerData.loadInDate.data)}</td>
          </tr>
          <tr>
            <th scope="row">Show Start</th>
            <td>{formatDateTime(headerData.showStartDate.data)}</td>
          </tr>
          <tr>
            <th scope="row">Show End</th>
            <td>{formatDateTime(headerData.plannedEndDate.data)}</td>
          </tr>
          <tr>
            <th scope="row">Load Out</th>
            <td>{formatDateTime(headerData.loadOutDate.data)}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Logistics</h2>
      <div class="grid">
        <div>
          <h3>Location Details</h3>
          <dl>
            <dt>Room</dt>
            <dd>{getCustomField('Room')}</dd>
            <dt>Parking</dt>
            <dd>{getCustomField('Parking Details')}</dd>
            <dt>Meal Provided</dt>
            <dd>{getCustomField('Meal Provided')}</dd>
          </dl>
        </div>
        <div>
          <h3>Schedule</h3>
          <pre>{getCustomField('Schedule')}</pre>
        </div>
      </div>
    </section>

    {#if getCustomField('Additional Info') !== 'Not specified'}
      <section>
        <h2>Additional Information</h2>
        <p>{getCustomField('Additional Info')}</p>
      </section>
    {/if}

    <section>
      <h2>Financial Summary</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Subtotal</th>
            <td>{formatCurrency(totals.priceSubtotal)}</td>
          </tr>
          <tr>
            <th scope="row">Sales Tax</th>
            <td>{formatCurrency(totals.salesTax)}</td>
          </tr>
          <tr>
            <th scope="row">Total Price</th>
            <td><strong>{formatCurrency(totals.totalPrice)}</strong></td>
          </tr>
          <tr>
            <th scope="row">Balance Due</th>
            <td><mark>{formatCurrency(totals.balanceDue)}</mark></td>
          </tr>
        </tbody>
      </table>
    </section>

    {#if quote.documents && quote.documents.length > 0}
      <section>
        <h2>Documents</h2>
        <nav>
          {#each quote.documents as document}
            <a 
              href={makeURL(document.filename_disk)} 
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              {document.title || 'View Document'}
            </a>
          {/each}
        </nav>
      </section>
    {/if}
  </article>
</main>

<style>
  .quote-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  header {
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
  
  h3 {
    font-size: 1.25rem;
    margin: 1.5rem 0;
  }
  
  .meta {
    font-size: 0.9rem;
    color: #666;
  }
  
  .meta div {
    margin-bottom: 0.5rem;
  }
  
  .quote-body {
    line-height: 1.7;
    margin: 1.5rem 0;
  }
  
  .documents {
    margin-top: 2rem;
  }
  
  .document-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .document a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #f2682a;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .document a:hover {
    background-color: #d3531a;
  }
</style> 