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
        <Head />

        <body style={{ display: "flex" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
