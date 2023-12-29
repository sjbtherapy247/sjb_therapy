/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://sjbtherapy.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true, 
  exclude: ['/server-sitemap.xml'],
  alternateRefs: [
  ],
},
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
     additionalPaths: async (config) => [
     await config.transform(config, '/additional-page'),
   ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://sjbtherapy.com/server-sitemap.xml',
    ],
  },




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