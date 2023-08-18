import PropTypes from 'prop-types';
import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
// import { Metadata } from 'next';
// emotion
import createEmotionServer from '@emotion/server/create-instance';

// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// theme
import palette from 'src/theme/palette';
import { primaryFont } from 'src/theme/typography';

// Data & SEO
// import TagManager from 'react-gtm-module';
// import { DefaultSeoProps } from 'next-seo';

// ----------------------------------------------------------------------

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
  </>
);

const Meta = () => (
  <>
    {/* PWA primary color */}
    <meta name="Primary Colour" content={palette('dark').primary.dark} />
  </>
);

export default function MyDocument({ emotionStyleTags }) {
  return (
    <Html lang="en-US" className={primaryFont.className}>
      <Head>
      <meta name="theme-color" content={palette('light').primary.main} />
      <meta name="description" content="SjB Therapy - Local Sydney Hypnotherapist" />
      <meta name="keywords" content="local,sydney,hypnotherapy,weight loss,anxiety" />
      <meta name="author" content="Simon J Baker" />

      <Script id="gtmscript"strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KWSDD4C');`}} />
        <Favicon />
        <Meta/>
        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}

      </Head>
      <body>
        <Main/>
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWSDD4C" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.propTypes = {
  emotionStyleTags: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
