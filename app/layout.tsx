import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <title>Trivias</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
