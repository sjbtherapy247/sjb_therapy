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

// next
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

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

// vercel tools
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

// Dynamically loaded components
const Modal = dynamic(() => import('src/components/modal/Modal'), { ssr: false });
const Notification = dynamic(() => import('src/components/notification/Notification'), { ssr: false });
const LoadingCircular = dynamic(() => import('src/components/loading-circular/LoadingCircular'), { ssr: false });

const clientSideEmotionCache = createEmotionCache();

export { reportWebVitals } from 'next-axiom';
export { AxiomWebVitals } from 'next-axiom';

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  // Default SEO settings
  const defaultTitle = 'Clinical Hypnotherapy - TRANCEform with Simon';
  const defaultDescription = 'Book a Free Session of hypnotherapy and remove anxiety, stress or fear. Boost your sport or work performance. TRANCEform your mind, TRANCEform your life.';
  const defaultUrl = 'https://sjbtherapy.com';
  const defaultImage = 'https://sjbtherapy.com/assets/sjb-logo/Hmain-darker.jpg';
  const defaultKeywords = 'local hypnotherapy, free session, remove anxiety,';

  // Page-specific SEO properties
  const { title, description, image, canonical, keywords } = pageProps;

  const openGraphData = {
    type: 'website',
    site_name: title || defaultTitle,
    description: description || defaultDescription,
    title: title || defaultTitle,
    url: canonical || defaultUrl,
    images: [
      {
        url: image || defaultImage,
        alt: title || defaultTitle,
        width: 1088,
        height: 718,
      },
    ],
  };

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={title || defaultTitle}
        description={description || defaultDescription}
        canonical={canonical || defaultUrl}
        openGraph={openGraphData}
        additionalMetaTags={[
          { name: 'keywords', content: keywords || defaultKeywords },
          { name: 'google-adsense-account', content: 'ca-pub-4877735171187701' },
        ]}
        twitter={{
          cardType: 'summary_large_image',
          title: title || defaultTitle,
          description: description || defaultDescription,
          image: image || defaultImage,
        }}
      />

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />

      {/* CacheProvider for Emotion */}
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
