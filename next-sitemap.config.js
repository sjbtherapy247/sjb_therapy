/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL || 'https://sjbtherapy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 1000,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
    
    ],
    
  },
}

export default config


// next-sitemap.config.js

// const { default: build } = require('next/dist/build');

// ** @type {import('next-sitemap').IConfig} */

// module.exports = {
//  siteUrl: 'https://sjbtherapy.com',
//  changefreq: 'daily',
//  priority: 0.7,
//  sitemapSize: 5000,
//  generateRobotsTxt: true,
//  exclude: ['/account','/auth'], // <= exclude here
//  robotsTxtOptions: {
//      userAgent: '*',
//      allow: '/',
  
//  additionalSitemaps: [
//      '/sitemap-0.xml', // <==== Add here
//    ],
//  },
// }


// const config = {
  // siteUrl: 'https://sjbtherapy.com',
  // generateRobotsTxt: true, // (Optional parameter for creating robots.txt file)
  // Other available options..
// };

// module.exports = config;