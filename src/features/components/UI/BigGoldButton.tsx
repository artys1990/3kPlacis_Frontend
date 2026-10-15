import styles from "./BigGoldButton.module.css";

interface BigGoldButtonProps {
  text: string;
  onClick?: () => void;
  btnType: "" | "inverse";
}

const BigGoldButton = ({ text, onClick, btnType }: BigGoldButtonProps) => {
  return (
    <button className={styles[btnType] + " " + styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};
export default BigGoldButton;
