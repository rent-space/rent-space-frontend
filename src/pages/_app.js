
import { SessionProvider } from "next-auth/react"

import "../styles/global.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, 
  pageProps: { session, ...pageProps} 
}) {
  return (
    <main className={montserrat.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
