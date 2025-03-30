<script>
  import { makeURL } from '$lib/directusHelpers';
  
  let { data } = $props();
  const article = data.article;
  
  // Format publication date
  const formattedDate = article.published_at ? 
    new Date(article.published_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : null;
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.description} />
</svelte:head>

<article class="article-container">
  <header>
    <h1>{article.title}</h1>
    {#if formattedDate}
      <div class="meta">
        <time datetime={article.published_at}>{formattedDate}</time>
        {#if article.author}
          <span class="author">by {article.author}</span>
        {/if}
      </div>
    {/if}
  </header>
  
  {#if article.image}
    <div class="featured-image">
      <img 
        src={makeURL(article.image.filename_disk)} 
        alt={article.title}
        width={article.image.width}
        height={article.image.height}
      />
    </div>
  {/if}
  
  {#if article.description}
    <div class="article-description">
      <p>{article.description}</p>
    </div>
  {/if}
  
  <div class="article-content">
    {@html article.content}
  </div>
</article>

<style>
  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  header {
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .meta {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .author {
    margin-left: 0.5rem;
  }
  
  .featured-image {
    margin-bottom: 2rem;
  }
  
  .featured-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .article-description {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 2rem;
    color: #444;
  }
  
  .article-content {
    line-height: 1.7;
  }
  
  .article-content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .article-content :global(p) {
    margin-bottom: 1.5rem;
  }
  
  .article-content :global(img) {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 4px;
  }
  
  .article-content :global(a) {
    color: #f2682a;
    text-decoration: underline;
  }
  
  .article-content :global(a:hover) {
    text-decoration: none;
  }
</style>
