const { withAxiom } = require('next-axiom');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/, // This allows for .mdx files in your project
});

// Combine the MDX and Axiom configurations
module.exports = withAxiom(
  withMDX({
    trailingSlash: false,
    reactStrictMode: true, // Enable strict mode
    images: {
      domains: ['sjbtherapy.com'], // Ensure images from your domain are allowed
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx'], // Add support for .mdx pages
    async redirects() {
      return [
        {
          source: '/support/',
          destination: '/',
          permanent: true, // Change to permanent if redirect is long-term
        },
        {
          source: '/maintenance/',
          destination: '/',
          permanent: true, // Same here
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap.xml',
        },
      ];
    },
  })
);
