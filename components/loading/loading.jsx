import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Please be patient...</p>
    </div>
  );
}
