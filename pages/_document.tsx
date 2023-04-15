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
          <noscript>
            <img height="1" width="1" style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=5754458981344109&ev=PageView&noscript=1"
            />
          </noscript>
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
