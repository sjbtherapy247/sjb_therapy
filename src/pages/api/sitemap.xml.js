import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import paths from '../../routes/paths';

const staticLinks = Object.values(paths).map(path => ({
  url: `https://sjbtherapy.com${path}`,
  changefreq: 'monthly',
  priority: 0.5
}));

async function fetchDynamicPaths() {
  try {
    const response = await fetch('https://sjbtherapy.com/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pages = await response.json();
    return pages.map(page => ({
      url: `/${page.slug}`,
      changefreq: 'weekly',
      priority: 0.5
    }));
  } catch (error) {
    console.error("Error fetching dynamic paths: ", error);
    return [];
  }
}

export default async function generateSitemap(req, res) {
  try {
    const dynamicLinks = await fetchDynamicPaths();
    const allLinks = [...staticLinks, ...dynamicLinks];

    const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });
    const xmlStream = Readable.from(allLinks);
    xmlStream.pipe(sitemapStream);

    const xmlString = await streamToPromise(xmlStream.pipe(sitemapStream)).then(data => data.toString());

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xmlString);
  } catch (error) {
    console.error('Sitemap generation failed', error);
    res.status(500).send('Failed to generate sitemap');
  }
}
