import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Layout from "../components/Layout";
import "./styles.css";
import { useAuth, AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
