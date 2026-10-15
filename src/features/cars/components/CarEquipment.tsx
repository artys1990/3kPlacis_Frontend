import styles from "./CarEquipment.module.css";

const CarEquipment = ({ equipment }) => {
  const categories = Object.entries(equipment);

  if (categories.length === 0) {
    return (
      <p className="equipment-empty">
        Aprīkojums šai automašīnai nav atzīmēts.
      </p>
    );
  }

  return (
    <section className={styles.equipmentSection}>
      <div className={styles.equipmentGrid}>
        {categories.map(([category, items]) => (
          <div key={category} className={styles.equipmentCard}>
            <h3 className={styles.equipmentCategoryTitle}>
              {category}
              <span className={styles.equipmentCount}>({items.length})</span>
            </h3>

            <ul className={styles.equipmentList}>
              {items.map((item) => (
                <li key={item.id} className={styles.equipmentItem}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CarEquipment;
