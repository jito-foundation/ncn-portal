import nextra from 'nextra'
 
const withNextra = nextra({
  // ... Other Nextra config options
  contentDirBasePath: '/docs',
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // ... Other Next.js config options
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs",
        permanent: true,
      }
    ]
  }
})