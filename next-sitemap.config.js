/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.kkochi-kkochi.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*", "/_next/*"],
};
