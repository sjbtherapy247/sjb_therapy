import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Example function to fetch dynamic posts (replace with your actual data fetching function)
async function fetchDynamicContent() {
    try {
        // Fetch dynamic posts or services (you might replace this with a fetch from a database or CMS)
        const response = await fetch('https://sjbtherapy.com/api/pages');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch dynamic content:', error);
        return []; // Return an empty array in case of failure to prevent crashes
    }
}

const handleRequest = async (req, res) => {
    try {
        const dynamicContent = await fetchDynamicContent();

        // Define static URLs for essential pages
        const staticLinks = [
            { url: '/', changefreq: 'weekly', priority: 1.0 },
            { url: '/about/', changefreq: 'monthly', priority: 0.6 },
            { url: '/service/', changefreq: 'weekly', priority: 0.8 },
            { url: '/mission/', changefreq: 'monthly', priority: 0.5 },
            { url: '/support/', changefreq: 'monthly', priority: 0.5 },
            { url: '/hypnotherapy-services/', changefreq: 'weekly', priority: 0.8 }, // Service index
            { url: '/insights/', changefreq: 'weekly', priority: 0.9 }, // Blog index
        ];

        // Specific service pages (adjust frequency based on how often you update)
        const servicePages = [
            { url: '/hypnotherapy-services/overcome-anxiety-and-remove-phobias', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/performance-hypnotherapy-tranceformd', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/quit-smoking-with-hypnotherapy', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/hypnosis-for-stress-management', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/hypnosis-for-insomnia-and-sleep-disorders', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/weight-loss-and-binge-eating', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/treatment-for-ptsd-and-trauma', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/hypnotherapy-for-depression-and-low-self-esteem', changefreq: 'monthly', priority: 0.7 },
            { url: '/hypnotherapy-services/performance-anxiety-and-stage-fright', changefreq: 'monthly', priority: 0.7 },
        ];

        // Blog post pages
        const blogPages = [
            { url: '/insights/hypnotherapy-understanding-the-mind-body-connection', changefreq: 'monthly', priority: 0.8 },
            { url: '/insights/quit-smoking-with-hypnosis', changefreq: 'monthly', priority: 0.8 },
            { url: '/insights/hypnotherapy-enhancing-your-sports-and-business-performance', changefreq: 'monthly', priority: 0.8 },
            { url: '/insights/hypnotherapy-synergy-with-psychotherapy', changefreq: 'monthly', priority: 0.8 },
            { url: '/insights/hypnotherapy-for-insomnia-embrace-a-tranquil-nights-sleep', changefreq: 'monthly', priority: 0.8 },
            { url: '/insights/golf-pro-cameron-davis-top-4-reasons-he-used-hypnotherapy', changefreq: 'monthly', priority: 0.8 },
        ];

        // Add dynamic content (e.g., posts, services)
        const dynamicLinks = dynamicContent.map(item => ({
            url: `/${item.slug}`,
            changefreq: 'weekly', // Adjust this if needed
            priority: 0.8,
        }));

        // Combine static and dynamic links
        const allLinks = [
            ...staticLinks,
            ...servicePages,
            ...blogPages,
            ...dynamicLinks
        ];

        // Create the sitemap stream
        const sitemapStream = new SitemapStream({ hostname: 'https://sjbtherapy.com' });
        const xmlStream = new Readable({
            read() {
                allLinks.forEach(link => sitemapStream.write(link));
                sitemapStream.end();
            },
        });

        // Generate the sitemap XML
        const xmlString = await streamToPromise(xmlStream.pipe(sitemapStream)).then(data => data.toString());

        // Send sitemap response
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xmlString);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Failed to generate sitemap');
    }
};

export default handleRequest;
