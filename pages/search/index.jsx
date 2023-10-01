import Head from "next/head";

import styles from "~/styles/search.module.css";
import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";
import SearchTips from "~/components/searchtips/searchtips";
import SearchForm from "~/components/searchbar/searchform";

export default function Search() {
  return (
    <main>
      <Head>
        <title>Search | CSView</title>
      </Head>
      <Navbar />
      <div id={styles.searchContainer}>
        <SearchForm />
        <SearchTips />
      </div>
      <Footer />
    </main>
  );
}
