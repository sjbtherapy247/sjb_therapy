import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
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
    <meta charSet="UTF-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
    <meta name="description" content="Hypnosis & Hypnotherapy in Sydney. Quit smoking, lose weight, reduce anxiety, and improve performance. Book Online Today." />
    <meta name="keywords" content="Simon Baker The Hypnotherapist - Clinical Hypnotherapy Sydney" />
    <meta name="theme-color" content={palette('light').primary.dark} />
    <meta name="google-adsense-account" content="ca-pub-4250297759847171" />
    {/* Open Graph meta tags for social media */}
    <meta property="og:title" content="Simon Baker - Clinical Hypnotherapy in Sydney" />
    <meta property="og:description" content="Quit smoking, lose weight, or improve your life with hypnotherapy. Book online with Simon Baker." />
    <meta property="og:image" content="https://sjbtherapy.com/assets/images/simon/simon-baker-main-sjbtherapy.webp" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.sjbtherapy.com" />
  </>
);

export default function MyDocument({ emotionStyleTags }) {
  return (
    <Html lang="en-US" className={primaryFont.className}>
      <Head>
        <Favicon />
        <Meta />
        {emotionStyleTags}

        {/* Google Tag Manager - Head */}
        <Script
          id="gtm-script-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWSDD4C');
            `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) - Body */}
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-KWSDD4C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
