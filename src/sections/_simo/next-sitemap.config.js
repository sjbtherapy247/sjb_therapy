  /** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://sjbtherapy.com', // Replace with your domain
    generateRobotsTxt: true, // (optional)
    exclude: ['/server-sitemap.xml'], // <= exclude static pages
    robotsTxtOptions: {
      additionalSitemaps: [
        `${process.env.SITE_URL}/server-sitemap.xml`, // <==== Add dynamic sitemaps
      ],
    },
  };