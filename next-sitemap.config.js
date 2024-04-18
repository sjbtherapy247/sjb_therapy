module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sjbtherapy.com',
  generateRobotsTxt: false,
  sitemapSize: 5000,
  outDir: './public',
  // eslint-disable-next-line arrow-body-style
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    };
  }
};
