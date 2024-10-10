// ----------------------------------------------------------------------

const { withAxiom } = require('next-axiom');

module.exports = withAxiom({
  trailingSlash: false,
  reactStrictMode: true, // Enable strict mode
  images: {
    domains: ['sjbtherapy.com'],
  },
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
});
