import { getServerSideSitemap } from 'next-sitemap';
import { getAllPostIds, getPostData } from '../lib/posts'; // Import your data fetching functions

export const getServerSideProps = async (ctx) => {
  const posts = getAllPostIds();

  const fields = posts.map((post) => ({
    loc: `<span class="math-inline">\{process\.env\.SITE\_URL\}/posts/</span>{post.params.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}