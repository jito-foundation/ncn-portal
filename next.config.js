const nextConfig = {
  output: 'standalone',
  sassOptions: {},
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
