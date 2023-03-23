import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Layout from "../components/Layout";
import "./styles.css";
import { AuthProvider } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Helmet from 'react-helmet';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      <Head>
        <link rel="canonical" href={"https://gonvar.io" + router.asPath} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
