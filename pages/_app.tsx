import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Layout from "../components/Layout";
import "./styles.css";
import { AuthProvider } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  return (
    <AuthProvider>
      <Head>
        <link rel="canonical" href={"https://gonvar.io" + router.asPath} />
        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/blog%2F%C2%BFCon%20qu%C3%A9%20puedo%20pegar%20u%C3%B1as%20postizas%20si%20no%20tengo%20pegamento%3F-604272aa-44aa-4f1e-80b5-7d4588aad96f?alt=media&amp;token=45651d40-7c50-480f-a874-bacbcb65cecf" />
        <meta property="twitter:image:src" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/blog%2F%C2%BFCon%20qu%C3%A9%20puedo%20pegar%20u%C3%B1as%20postizas%20si%20no%20tengo%20pegamento%3F-604272aa-44aa-4f1e-80b5-7d4588aad96f?alt=media&amp;token=45651d40-7c50-480f-a874-bacbcb65cecf" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/blog%2F%C2%BFCon%20qu%C3%A9%20puedo%20pegar%20u%C3%B1as%20postizas%20si%20no%20tengo%20pegamento%3F-604272aa-44aa-4f1e-80b5-7d4588aad96f?alt=media&amp;token=45651d40-7c50-480f-a874-bacbcb65cecf" />
        <meta property="og:title" content="Gonvar nails academy prueba" />
        <meta property="og:url" content={"https://gonvar.io" + router.asPath} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
