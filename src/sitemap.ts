import { getPageStaticInfo } from "";

export default async function sitemap() {
    const baseUrl = "https://sjbtherapy.com";

    //g get All Posts from CMS
    const Posts = await getPageStaticInfo();
    const postsUrls = posts?.map((post) => {
        return {
            url: `${baseUrl}/${post.slug}`,
            lastModified: new Date(),
        }:

    }):

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },

    ]:

}