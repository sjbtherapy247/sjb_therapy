export default handleRequest;
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

async function fetchPages() {
    try {
        const response = await fetch('https://sjbtherapy.com/api/pages');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch pages:", error);
        return []; // Return an empty array to avoid further errors
    }
}

const handleRequest = async (req, res) => {
    try {
        const pages = await fetchPages();
        console.log('Pages:', pages); // Debug output

        const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });
        const xmlStream = new Readable({
            read() {
                pages.forEach(page => {
                    console.log('Writing page to stream:', page); // Debug output
                    sitemapStream.write({
                        url: `/${page.slug}`,
                        changefreq: 'daily',
                        priority: 0.8
                    });
                });
                sitemapStream.end();
            }
        });

        const xmlString = await streamToPromise(xmlStream.pipe(sitemapStream)).then(data => data.toString());
        console.log('Sitemap XML String:', xmlString); // Debug output

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xmlString);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Failed to generate sitemap');
    }
};

export default handleRequest;
