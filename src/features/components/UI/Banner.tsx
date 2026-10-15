import BigGoldButton from "../UI/BigGoldButton";

import styles from "./Banner.module.css";

interface BannerProps {
  background: string;
  buttonClick?: () => void;
  title: string;
  description: string;
  button: string;
}

const Banner = ({
  background,
  title,
  description,
  button,
  buttonClick,
}: BannerProps) => {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.54)) , url(${background})`,
      }}
    >
      <div className={styles.header}>{title}</div>
      <div className={styles.body}>{description}</div>
      <div className={styles.actions}>
        <BigGoldButton onClick={buttonClick} text={button} btnType="inverse" />
      </div>
    </div>
  );
};
export default Banner;
