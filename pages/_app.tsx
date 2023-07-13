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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      <Head>
        <meta property="og:title" content="Academia de Belleza Online | Gonvar" />
        <meta property="og:description" content="Descubre la academia de belleza para convertirte en un experto. Aprende técnicas y tendencias con los profesionales del sector. ¡Inscríbete ya!" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/gonvar_purple%20(1).png?alt=media&token=0e6f38b7-1c05-4db7-99fa-b16601681275" />
        <meta property="og:url" content="https://gonvar.io" />
        <link rel="canonical" href={"https://gonvar.io" + router.asPath} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <Script
          id="fb-pixel"
          dangerouslySetInnerHTML={{
            __html:
              `
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
    `
          }}
        />

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
