import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | CSView</title>
      </Head>
      <main>
        <Navbar />
        <Wip />
        <Footer />
      </main>
    </>
  );
}
