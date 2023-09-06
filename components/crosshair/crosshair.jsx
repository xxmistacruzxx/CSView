import styles from "./crosshair.module.css";

export default function Crosshair({ name, commandsString }) {
  function copyCommands() {
    navigator.clipboard.writeText(commandsString);
    alert(
      `${name}'s crosshair copied!\nPaste the sequence of commands in your game console to use it!`
    );
  }

  return (
    <div className={styles.crosshairContainer}>
      <div className={styles.crosshairBorder}>
        <div className={styles.crosshair} onClick={copyCommands}>
          <div className={styles.crosshairImageContainer}>
            <img
              className={styles.crosshairImg}
              src={`/images/crosshairs/${name}.png`}
            />
          </div>
          <div className={styles.crosshairNameContainer}>
            <p className={styles.crosshairName}>{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
