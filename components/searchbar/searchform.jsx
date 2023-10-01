import axios from "axios";
import $ from "jquery";

import styles from "./searchform.module.css";

export default function SearchForm() {
  async function onSearch(event) {
    event.preventDefault();
    let query = $("#searchInput").val();
    let queryEdit = query.trim();
    if (queryEdit === "") {
      alert(`"${query}" is not a valid input.`);
      return;
    }
    let type = $("#type").val();

    let options = {
      method: "GET",
      url: `${
        window.location.href.split("/")[0]
      }/api/find/?term=${query}&type=${type}`,
      headers: {},
    };
    let res;
    try {
      res = await axios.request(options);
    } catch (e) {
      res = { data: { error: e.toString() } };
    }
    console.log(res);

    if (res.data.error !== undefined) {
      alert("An error has occurred. Please check your input.");
      return;
    }
    window.location.replace(
      `${window.location.href.split("/")[0]}/search/${res.data.id}`
    );
  }

  return (
    <form id={styles.searchForm} onSubmit={onSearch}>
      <div className={styles.inputContainer}>
        <label htmlFor="type">Search Type</label>
        <select id="type">
          <option>URL</option>
          <option>Username</option>
          <option>CommunityID</option>
          <option>SteamID</option>
        </select>
      </div>
      <div className={styles.inputContainer} id={styles.searchInputContainer}>
        <label htmlFor="searchInput">Search Term</label>
        <div id={styles.searchInput}>
          <input id="searchInput" name="searchInput" type="text"></input>
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
  );
}
