// import nextra from "nextra";

// const withNextra = nextra({
//   theme: "nextra-theme-docs",
//   themeConfig: "./theme.config.js",
// });

// const nextConfig = {
//   output: "standalone",
//   sassOptions: {},
//   reactStrictMode: false,
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/login",
//         permanent: true,
//       },
//     ];
//   },
//   logging: {
//     fetches: {
//       fullUrl: true,
//     },
//   },
// };

// // Use Nextra v3 with themeConfig
// export default withNextra(nextConfig);

// import nextra from "nextra";
// import theme from "nextra-theme-docs";

// const nextConfig = {
//   output: "standalone",
//   sassOptions: {},
//   reactStrictMode: false,
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/login",
//         permanent: true,
//       },
//     ];
//   },
//   logging: {
//     fetches: {
//       fullUrl: true,
//     },
//   },
// };

// // Apply Nextra v4 with the correct syntax
// export default nextra({
//   theme: "nextra-theme-docs",
//   themeConfig: "./theme.config.js",
// })(nextConfig);

import nextra from 'nextra'
 
const withNextra = nextra({
  // ... Other Nextra config options
  contentDirBasePath: '/docs',
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // ... Other Next.js config options
})