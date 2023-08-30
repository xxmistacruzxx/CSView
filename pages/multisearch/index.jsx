import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Head from "next/head";

export default function Multisearch() {
  return (
    <>
      <Head>
        <title>Multisearch | CSView</title>
      </Head>
      <main>
        <Navbar />
        <Wip />
        <Footer />
      </main>
    </>
  );
}
