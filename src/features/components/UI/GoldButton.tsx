import styles from "./GoldButton.module.css";

const GoldButton = ({ children, onClick }) => {
  return (
    <button className={styles.goldButton} onClick={onClick}>
      {children}
    </button>
  );
};
export default GoldButton;
