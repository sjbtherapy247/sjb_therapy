// pages/sitemap.xml.js

const homepage = "https://www.sjbtherapy.com"

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/mission</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/overcome-anxiety-and-remove-phobias</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/performance-hypnotherapy-tranceformd</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/quit-smoking-with-hypnotherapy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/hypnosis-for-stress-management</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>  
      <url>
        <loc>${homepage}/hypnotherapy-services/hypnosis-for-insomnia-and-sleep-disorders</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/weight-loss-and-binge-eating</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/treatment-for-ptsd-and-trauma</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/hypnotherapy-for-depression-and-low-self-esteem</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/hypnotherapy-services/performance-anxiety-and-stage-fright</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/insights</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/insights/hypnotherapy-understanding-the-mind-body-connection</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/insights/quit-smoking-with-hypnosis</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/insights/hypnotherapy-enhancing-your-sports-and-business-performance</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/insights/hypnotherapy-synergy-with-psychotherapy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>

    </urlset>
  `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}