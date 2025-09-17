import { FacebookProvider } from "react-facebook";

import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "../components/Layout";
import { AdminsContext } from "../hooks/AdminContext";
import { AuthProvider } from "../hooks/useAuth";
import { CanonicalURL } from "../utils/functions";
import "./styles.css";

import type { AppProps } from 'next/app';

const MAINTENANCE = false;

function MaintenanceScreen() {
  return (
    <>
      <Head>
        <title>Sitio en mantenimiento | Gonvar</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <link rel="canonical" href={CanonicalURL()} />
      </Head>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#111',
          color: '#fff',
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ marginBottom: '0.75rem' }}>🚧 Actualmente no estamos disponibles</h1>
          <p style={{ opacity: 0.9 }}>
            Estamos trabajando para restablecer el servicio lo antes posible. Gracias por tu paciencia.
          </p>
        </div>
      </div>
    </>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  // Si hay mantenimiento, no montamos providers ni layout para evitar llamadas externas
  if (MAINTENANCE) {
    return <MaintenanceScreen />;
  }

  return (
    <AuthProvider>
      <AdminsContext>
        <Head>
          <title>Academia de Belleza Online | Gonvar</title>
          <link rel="canonical" href={CanonicalURL()} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
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