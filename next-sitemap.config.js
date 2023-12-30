/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL || 'https://sjbtherapy.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 1000,
  exclude: ['/account', '/support', '/server-sitemap.xml'],

  // optional
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: []
      },
    ],
    additionalSitemaps: [
      'https://sjbtherapy.com/sitemap-0.xml',
      'https://sjbtherapy.com/sitemap.xml',
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
