// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sjbtherapy.com',
  generateRobotsTxt: true,
  exclude: ['/account/','/auth/'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      '', // <==== Add here
    ],
  },
}

// const config = {
  // siteUrl: 'https://sjbtherapy.com',
  // generateRobotsTxt: true, // (Optional parameter for creating robots.txt file)
  // Other available options..
// };

// module.exports = config;