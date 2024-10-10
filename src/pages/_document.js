import PropTypes from 'prop-types';
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'src/utils/createEmotionCache';
import palette from 'src/theme/palette';
import { primaryFont } from 'src/theme/typography';

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
  </>
);

const Meta = () => (
  <>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
    <meta name="description" content="Hypnosis & Hypnotherapy in Sydney. Quit smoking or Vaping, Weight loss, Anxiety, Addiction, Phobia, Low Confidence, or More Performance. Book Online Today." />
    <meta name="keywords" content="Simon Baker The Hypnotherapist - Clinical Hypnotherapy Sydney" />
    <meta name="theme-color" content={palette('light').primary.dark} />
    <meta name="google-adsense-account" content="ca-pub-4250297759847171" />
  </>
);

export default function MyDocument({ emotionStyleTags }) {
  return (
    <Html lang="en-US" className={primaryFont.className}>
      <Head>
        <Favicon />
        <Meta />
        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.propTypes = {
  emotionStyleTags: PropTypes.array.isRequired,
};

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
