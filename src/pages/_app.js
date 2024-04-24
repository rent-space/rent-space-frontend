
import { SessionProvider } from "next-auth/react"
import Head from 'next/head';

import "../styles/global.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, 
  pageProps: { session, ...pageProps} 
}) {
  return (
    <main className={montserrat.className}>
      <Head>
        <title>RentSpace</title>
        <meta property="og:title" content="RentSpace" key="rentspace" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
