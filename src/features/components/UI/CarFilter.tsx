import { useState } from "react";
import { useCarFilters } from "#/features/cars/hooks/useCars.ts";
import styles from "./CarFilter.module.css";

const CarFilter = ({ brandVal, modelVal, handleBrand, handleModel }) => {
  const [selectedBrand, setSelectedBrand] = useState(brandVal || "");
  const [selectedModel, setSelectedModel] = useState(modelVal || "");

  const filterOptions = useCarFilters();
  const brands = filterOptions?.data?.brands ?? [];
  const models = (filterOptions?.data?.models ?? []).filter(
    (model) => model.brand._id === selectedBrand,
  );

  if (filterOptions.isLoading) return <p>Notiek ielāde...</p>;
  if (filterOptions.error) return <p>Kļūda ielādējot datus</p>;
  return (
    filterOptions.data && (
      <>
        <form className={styles.singleRowForm}>
          <div className={styles.formGroup}>
            <label htmlFor="brand">Marka</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => {
                handleBrand(e.target.value);
                setSelectedBrand(e.target.value);
              }}
            >
              <option value="">Visas Markas</option>

              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="model">Modelis</label>
            <select
              value={selectedModel}
              id="model"
              disabled={!selectedBrand}
              onChange={(e) => {
                handleModel(e.target.value);
                setSelectedModel(e.target.value);
              }}
            >
              <option value="">All models</option>
              {models
                .filter((m) => m.brand._id === selectedBrand)
                .map((model) => (
                  <option key={model._id} value={model._id}>
                    {model.name}
                  </option>
                ))}
            </select>
          </div>
        </form>
      </>
    )
  );
};
export default CarFilter;
