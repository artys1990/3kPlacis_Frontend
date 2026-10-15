import styles from "./CarCard.module.css";
import { FaGasPump, FaCog, FaRoad } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import { formatPrice, formatMileage } from "../../../lib/functions";

interface CarCardProps {
  image: string;
  year: number;
  brand: string;
  model: string;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  id: string;
}

const CarCard = ({
  image,
  year,
  brand,
  model,
  price,
  mileage,
  fuel,
  transmission,
  id,
}: CarCardProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`${brand} ${model}`} fetchPriority="high" />

        <span className={styles.year}>{year}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3>{brand}</h3>
            <p>{model}</p>
          </div>

          <span className={styles.price}> {formatPrice(price)}</span>
        </div>

        <div className={styles.specs}>
          <div>
            <FaRoad />
            <span>{formatMileage(mileage)}</span>
            <small>Nobraukums</small>
          </div>

          <div>
            <FaGasPump />
            <span>{fuel}</span>
            <small>Degviela</small>
          </div>

          <div>
            <FaCog />
            <span>{transmission}</span>
            <small>Ātr.kārba</small>
          </div>
        </div>

        <button
          className={styles.button}
          onClick={() => navigate({ to: "/car/$carId", params: { carId: id } })}
        >
          Skatīt vairāk
        </button>
      </div>
    </div>
  );
};
export default CarCard;
