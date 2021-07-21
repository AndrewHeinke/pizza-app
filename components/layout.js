import Head from "next/head";
import Header from "./Header";

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <title>Pizza App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Pizza App" />
        <meta name="og:title" content="Pizza App" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}
