// ----------------------------------------------------------------------

module.exports = {
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

};
