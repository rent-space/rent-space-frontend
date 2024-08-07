import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";

import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { TranslationProvider } from "../provider/TranslationProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={montserrat.className}>
      <Head>
        <title>RentSpace</title>
        <meta property="og:title" content="RentSpace" key="rentspace" />
      </Head>
      <TranslationProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ToastContainer theme="light" position="bottom-right" pauseOnHover />
        </SessionProvider>
      </TranslationProvider>
    </main>
  );
}
