import { AppProps } from "next/app";
import Header from "./components/HomePage/Header";
import { SessionProvider, useSession } from "next-auth/react";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
