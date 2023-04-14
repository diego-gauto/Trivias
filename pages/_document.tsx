import Document, { Head, Html, Main, NextScript } from "next/document";
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
          {/* <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8N2X594YBK"></script>
<script>
{ window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8N2X594YBK');}
</script> */}
          {/* <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}
    (window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '5754458981344109');
    fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=5754458981344109&ev=PageView&noscript=1"
    />
    </noscript> */}
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
