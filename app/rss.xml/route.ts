import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.SITE_URL || 'https://shadcn-landing-page.vercel.app';

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const postDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[PureLanding Blog]]></title>
    <description><![CDATA[Latest articles, tutorials, and insights about web development, design, and technology.]]></description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
