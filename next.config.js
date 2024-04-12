const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/characters',
        permanent: false,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
    @import "../_variables.scss";
    @import "../_mixins.scss";
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '**',
      },
    ],
  },
}