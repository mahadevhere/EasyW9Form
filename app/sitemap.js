export default function sitemap() {
  const baseUrl = 'https://www.easyw9form.com';

  return [
    {
      url: baseUrl,
      lastModified: '2026-04-27',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fill-w9-form-online`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Guides
    {
      url: `${baseUrl}/guides/how-to-fill-w9`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/tax-difference-w9-vs-w4`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/w9-for-independent-contractors`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/secure-w9-generation`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Blog posts
    {
      url: `${baseUrl}/blog/w9-form-for-llc`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/when-do-you-need-a-w9`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/w9-form-for-rental-property`,
      lastModified: '2026-04-27',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2026-04-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2026-04-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: '2026-04-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
