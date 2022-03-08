import '../styles/globals.css'
// eslint-disable-next-line @next/next/no-document-import-in-page
import {Head} from "next/document";

function MyApp({ Component, pageProps }) {
  <Head>
    <title>My new cool app</title>
  </Head>
  return <Component {...pageProps} />

}

export default MyApp
