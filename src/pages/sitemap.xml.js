// pages/sitemap.xml.js

const EXTERNAL_DATA_URL = 'https://sjbtherapy.com';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://sjbtherapy.com/insights/</loc>
     </url>
     <url>
       <loc>https://sjbtherapy.com/services/</loc>
     </url>
     ${posts
       // eslint-disable-next-line arrow-body-style
       .map(({ id }) => {
        return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {

}

export async function getServerSideProps({ res }) {
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json(); 
  
  const sitemap = generateSiteMap(posts);
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default SiteMap;
