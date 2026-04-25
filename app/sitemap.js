export default function sitemap() {
  const baseUrl = 'https://www.easyw9form.com';

  const routes = [
    '',
    '/fill-w9-form-online',
    '/privacy',
    '/terms',
    '/refund',
    '/guides/how-to-fill-w9',
    '/guides/tax-difference-w9-vs-w4',
    '/guides/w9-for-independent-contractors',
    '/guides/secure-w9-generation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
