import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/tailwind.css';
import '../styles/globals.css';
import Contexts from '../context';
import '../config/axios';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import dynamic from 'next/dynamic';


function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <Contexts>
      <Head>
        <title>DoveDB</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
        />
      </Head>
      <AnyComponent {...pageProps} />
    </Contexts>
  );
}

export default MyApp;
