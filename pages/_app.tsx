import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Layout from "../components/Layout";
import "./styles.css";
import { AuthProvider } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from 'react-facebook';
import Script from "next/script";
import { CanonicalURL } from "../utils/functions";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      <Head>
        <link rel="canonical" href={CanonicalURL()} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <GoogleOAuthProvider clientId="723229844184-qls1eibq3e0b6g4uase8l5b94sm3cukl.apps.googleusercontent.com">
        <FacebookProvider appId="3010100615906804">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FacebookProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
export default MyApp;