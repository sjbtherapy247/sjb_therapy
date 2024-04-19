
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

        const staticLinks = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'monthly', priority: 0.7 },
            { url: '/service', changefreq: 'monthly', priority: 0.6 },
            { url: '/mission', changefreq: 'monthly', priority: 0.6 },
            { url: '/support', changefreq: 'monthly', priority: 0.6 },
            { url: 'hypnotherapy-services/overcome-anxiety-and-remove-phobias', changefreq: 'monthly', priority: 0.6 },
            // Add more static URLs as needed
        ];

        const dynamicLinks = pages.map(page => ({
            url: `/${page.slug}`,
            changefreq: 'weekly',
            priority: 0.8
        }));

        const allLinks = [...staticLinks, ...dynamicLinks];

        const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });
        const xmlStream = new Readable({
            read() {
                allLinks.forEach(link => {
                    sitemapStream.write(link);
                });
                sitemapStream.end();
            }
        });

        const xmlString = await streamToPromise(xmlStream.pipe(sitemapStream)).then(data => data.toString());

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xmlString);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Failed to generate sitemap');
    }
};

export default handleRequest;
