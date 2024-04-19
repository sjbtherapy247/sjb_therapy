// ----------------------------------------------------------------------
const { withAxiom } = require('next-axiom');

module.exports = withAxiom({
    trailingSlash: true,
      async redirects() {
          return [
              {
                  source: '/support/',
                  destination: '/',
                  permanent: false,
              },
              {
                  source: '/maintenance/',
                  destination: '/',
                  permanent: false,
              }
  
        ]
      }
  
  });

  module.exports = {
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap.xml', // Adjust the destination if your endpoint is named differently
        },
      ];
    },
  };