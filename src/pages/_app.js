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

// ----------------------------------------------------------------------

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

// data&SEO
// import Script from 'next/script';
// import TagManager from 'react-gtm-module';
// import { NextSeo } from 'next-seo';
// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        
      </Head>

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
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
