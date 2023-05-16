import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { appConfig } from "../utils/appConfig";
/**
 * Document class
 * @class
 */
class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang={appConfig.locale}>
        <Head>
          <link rel="icon" href="/images/logo.png" />
          <meta name="google-site-verification" content="ktKaEDz-5AbCakVSsWi0RPJmOVR7eKyxZOFVUirS3xw" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
          <script src="https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js"></script>
          <noscript>
            <img height="1" width="1" style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=5754458981344109&ev=PageView&noscript=1"
            />
          </noscript>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-8N2X594YBK"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8N2X594YBK');`
            }}>
          </script>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M4DJNFW');`
            }}
          >
          </script>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4DJNFW"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
