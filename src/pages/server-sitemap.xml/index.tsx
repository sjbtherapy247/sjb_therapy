/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import { getServerSideSitemapLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
 
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//sjbtherapy.com/api')
 
  const fields = [
    {
      loc: 'https://sjbtherapy.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://sjbtherapy.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]
 
  return getServerSideSitemapLegacy(ctx, fields)
}
 
// Default export to prevent next.js errors
export default function Sitemap() {}