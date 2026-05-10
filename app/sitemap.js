export default function sitemap() {
  const baseUrl = 'https://www.easyw9form.com';
  const today = '2026-05-10';

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fill-w9-form-online`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Guides
    {
      url: `${baseUrl}/guides/how-to-fill-w9`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/tax-difference-w9-vs-w4`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/w9-for-independent-contractors`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/secure-w9-generation`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/what-to-do-without-ein`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Blog posts
    {
      url: `${baseUrl}/blog/w9-form-for-llc`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/when-do-you-need-a-w9`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/w9-form-for-rental-property`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/w9-vs-1099`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/what-happens-no-w9`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2026-04-20',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2026-04-20',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: '2026-04-20',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
