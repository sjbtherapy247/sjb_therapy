module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sjbtherapy.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public',
 
  transform: async (config, path) => ({
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    })
};
