import styles from "./quickstats.module.css";

export default function Quickstats({ data }) {
  return (
    <div className={styles.player}>
      <div className={styles.playerInfo}>
        <a href={data.general.playerLink}>
          <img src={data.general.playerAvatar} />
          <h3>{data.general.playerName}</h3>
          <p>{data.general.id}</p>
        </a>
      </div>
      <div className={styles.ranks}>
        <div className={styles.rank}>
          <h4>CS2 Rating</h4>
          <div style={{ backgroundImage: `${data.cs2.rankBackground}` }}>
            <p>{data.cs2.rank}</p>
          </div>
          <p>Wins: {data.cs2.wins}</p>
        </div>
        <div className={styles.rank}>
          <h4>CSGO Rank</h4>
          <div>
            <img src={data.csgo.rank} />
          </div>
          <p>Wins: {data.csgo.wins}</p>
        </div>
      </div>
      <div className={styles.stat}>
        <h4>Win Rate</h4>
        <div>
          <div>
            <h5>CS2</h5>
            <p>{data.cs2.inner.winRate.winRate}</p>
          </div>
          <div>
            <h5>CSGO</h5>
            <p>{data.csgo.inner.winRate.winRate}</p>
          </div>
        </div>
      </div>
      <div className={styles.stat}>
        <h4>Headshot Rate</h4>
        <div>
          <div>
            <h5>CS2</h5>
            <p>{data.cs2.inner.hs.hs}</p>
          </div>
          <div>
            <h5>CSGO</h5>
            <p>{data.csgo.inner.hs.hs}</p>
          </div>
        </div>
      </div>
      <div className={styles.stat}>
        <h4>ADR</h4>
        <div>
          <div>
            <h5>CS2</h5>
            <p>{data.cs2.inner.adr.adr}</p>
          </div>
          <div>
            <h5>CSGO</h5>
            <p>{data.csgo.inner.adr.adr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
