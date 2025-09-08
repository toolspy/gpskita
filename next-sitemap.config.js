/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shadcn-landing-page.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*'],
  additionalPaths: async (config) => {
    const result = [];
    
    // Add blog posts to sitemap
    const { getAllPosts } = await import('./lib/posts');
    const posts = getAllPosts();
    
    posts.forEach((post) => {
      result.push({
        loc: `/blog/${post.slug}`,
        lastmod: post.date,
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
    
    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
