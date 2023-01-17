import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import GlobalContextProvider from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
