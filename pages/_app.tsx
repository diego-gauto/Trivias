import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { Head } from "next/document";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gonvar Nails Academy</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
