import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (<>
  <Head>
  {/* ページタイトル */}
  <title>Tone Assist</title>

</Head>
  <Component {...pageProps} />
  </>
  );
}
