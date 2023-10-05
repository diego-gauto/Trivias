import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Layout from "../components/Layout";
import "./styles.css";
import { AuthProvider } from "../hooks/useAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from 'react-facebook';
import { CanonicalURL } from "../utils/functions";


import { useEffect } from "react";
import { AdminsContext } from "../hooks/AdminContext";
declare let Conekta: any
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AdminsContext>
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
      </AdminsContext>
    </AuthProvider>
  );
}
export default MyApp;