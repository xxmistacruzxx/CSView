import styles from "./searchtips.module.css";

export default function SearchTips() {
  return (
    <div id={styles.searchTips}>
      <h3>Search Tips</h3>
      <p>• Username <strong>[WIP]</strong> - The username used to sign into a given account. Only works if used as their custom URL (e.g. xxmistacruzxx). </p>
      <p>• CommunityID - The unique number given to an account upon creation. Can be found by navigating to an account's profile page (e.g. 76561198065924863).</p>
      <p>• SteamID <strong>[WIP]</strong> - The unique string given to an account upon creation. Can be found in game by opening console and typing "status" (e.g. STEAM_0:1:52829567). </p>
      <p>• URL (Community or Custom) <strong>[WIP]</strong> - The URL used to navigate to the account's profile (e.g. https://steamcommunity.com/profiles/76561198065924863 or https://steamcommunity.com/id/xxmistacruzxx). </p>
    </div>
  );
}
