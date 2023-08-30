import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Head from "next/head";

export default function Matches() {
  return (
    <>
      <Head>
        <title>Matches | CSView</title>
      </Head>
      <main>
        <Navbar />
        <Wip />
        <Footer />
      </main>
    </>
  );
}
