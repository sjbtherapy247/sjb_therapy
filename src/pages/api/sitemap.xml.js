import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import paths from '../../routes/paths';


const sitemapHandler = async (req, res) => {
  const links = Object.values(paths).map(path => ({
    url: `https://sjbtherapy.com${path}`,
    changefreq: 'weekly',
    priority: 0.5
  }));

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