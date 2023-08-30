import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Head from "next/head";

export default function Crosshairs() {
  return (
    <>
      <Head>
        <title>Crosshairs | CSView</title>
      </Head>
      <main>
        <Navbar />
        <Wip />
        <Footer />
      </main>
    </>
  );
}
