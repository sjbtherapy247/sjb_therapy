// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
// import SEO from 'next-seo/next-seo.config';
// ----------------------------------------------------------------------

// import { Analytics } from '@vercel/analytics/react';

import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
// next
import Head from 'next/head';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import enAU from 'date-fns/locale/en-AU';

// theme
import ThemeProvider from 'src/theme';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import ProgressBar from 'src/components/progress-bar';
import { SettingsProvider } from 'src/components/settings';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import LoadingCircular from 'src/components/loading-circular/LoadingCircular';
import Notification from 'src/components/notification/Notification';
import Modal from 'src/components/modal/Modal';
// import { SpeedInsights } from "@vercel/speed-insights/next"

// data&SEO
// import Script from 'next/script';
// import TagManager from 'react-gtm-module';
// import { NextSeo } from 'next-seo';
// import metadata from 'next'

// ----------------------------------------------------------------------


const clientSideEmotionCache = createEmotionCache();
export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const defaultTitle = 'Local Hypnotherapy - Free Session - SjB Therapy';
  const defaultDescription = 'Book a Free Session of local hypnotherapy and remove anxiety, stress or fear. Boost your sport or work performance.  TRANCEform your mind, TRANCEform your life.';
  const defaultUrl = 'https://sjbtherapy.com';
  const defaultImage = 'https://sjbtherapy.com/assets/sjb-logo/Hmain-darker.jpg';
  const defaultKeywords = 'local hypnotherapy, free session, remove anxiety,';
  const { title, description, image, canonical, keywords } = pageProps;

  const openGraphData = [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: title || defaultTitle },
    { property: 'og:description', content: description || defaultDescription },
    { property: 'og:title', content: title || defaultTitle },
    { property: 'og:url', content: canonical || defaultUrl },
    { property: 'og:image', content: image || defaultImage },
    { property: 'og:image:alt', content: defaultTitle },
    { property: 'og:image:width', content: '1088' },
    { property: 'og:image:height', content: '718' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title || defaultTitle },
    { name: 'twitter:description', content: description || defaultDescription },
    { name: 'twitter:image', content: image || defaultImage },
    { property: 'twitter:url', content: canonical || defaultUrl },
    { property: 'twitter:domain', content: 'sjbtherapy.com' },
    { property: 'twitter:image', content: image || defaultImage },
  ];

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="google-adsense-account" content="ca-pub-4877735171187701" />
        {openGraphData.map((og) => (
          <meta key={og.property || og.name} {...og} />
          
        ))}
        <link rel="canonical" href={canonical || defaultUrl} />
        <link rel="alternate" media="only screen and (max-width: 640px)" href={canonical || defaultUrl} />
      </Head>
  
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
          <SettingsProvider>
            <ThemeProvider>
              <LoadingCircular />
              <Modal />
              <Notification />
              <MotionLazyContainer>
                <ProgressBar />
                {getLayout(<Component {...pageProps} />)}
              </MotionLazyContainer>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
