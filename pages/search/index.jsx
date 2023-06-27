import $ from "jquery";

import styles from "~/styles/search.module.css";
import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";

export default function Search() {
  function onSearch(event) {
    event.preventDefault();
    let query = $("#searchInput").val();
    let queryEdit = query.trim();
    if (queryEdit === "") {
      alert(`"${query}" is not a valid input.`);
      return;
    }
    window.location.replace(
      `${window.location.href.split("/")[0]}/search/${queryEdit}`
    );
  }

  return (
    <main>
      <Navbar />
      <div id={styles.searchContainer}>
        <form id={styles.searchForm} onSubmit={onSearch}>
          <div
            className={styles.inputContainer}
            id={styles.searchInputContainer}
          >
            <label htmlFor="searchInput">Username/SteamID/URL</label>
            <div id={styles.searchInput}>
              <input
                id="searchInput"
                name="searchInput"
                type="text"
                placeholder="xxmistacruzxx"
              ></input>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="searchButton">Search</label>
            <div id={styles.searchButton}>
              <input
                id="searchButton"
                name="searchButton"
                type="submit"
                value="GO"
              ></input>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
