import styles from "./crosshair.module.css";

export default function Crosshair({ name, commandsString }) {
  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }

  function copyCommands() {
    unsecuredCopyToClipboard(commandsString);
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
