import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Function to fetch the list of pages or posts
async function fetchPages() {
    // Replace this URL with the actual API endpoint that returns your site data
    const response = await fetch('https://sjbtherapy.com/api/pages');
    const pages = await response.json();
    return pages;
}

const handleRequest = async (req, res) => {
    try {
        const pages = await fetchPages();

        // Set up the sitemap stream
        const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });
        const xmlStream = new Readable({
            read() {
                pages.forEach(page => {
                    sitemapStream.write({
                        url: `/${page.slug}`, // Ensure your page objects have a 'slug' or equivalent property
                        changefreq: 'daily',
                        priority: 0.8
                    });
                });
                sitemapStream.end();
            }
        });

        // Convert the stream to XML string
        const xmlString = await streamToPromise(xmlStream.pipe(sitemapStream)).then(data => data.toString());

        // Set header and send the XML sitemap
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xmlString);
    } catch (error) {
        console.error('Error generating sitemap', error);
        res.status(500).send('Failed to generate sitemap');
    }
};

export default handleRequest;
