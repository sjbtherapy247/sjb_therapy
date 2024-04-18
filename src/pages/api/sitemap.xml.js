import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const sitemapHandler = async (req, res) => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 0.7 },
    // Add more URLs dynamically based on your application
  ];

  const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(sitemapStream)
  ).then((data) => data.toString());

  res.end(xmlString);
};

export default sitemapHandler;
