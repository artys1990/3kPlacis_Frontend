import { useForm } from "@tanstack/react-form";
import { useBrands } from "../../../features/brands/hooks/useBrands";
import { useModels } from "../../../features/brands/hooks/useModels";
// import { getModels } from "../../brands/api/getModels";
import { useQuery } from "@tanstack/react-query";
import styles from "./CarFilter.module.css";
import { useNavigate, useSearch } from "@tanstack/react-router";
import GoldButton from "./GoldButton";
import { useState, useRef, useCallback, useEffect } from "react";
import type { CarFilters } from "../../../routes/_public/browse";
import { useCars } from "#/features/cars/hooks/useCars.ts";

const CarFilter = () => {
  const [showMore, setShowMore] = useState(false);
  const search = useSearch({ from: "/_public/browse" });

  const navigate = useNavigate({ from: "/browse" });
  const form = useForm({ defaultValues: search });

  useEffect(() => {
    form.reset(search);
  }, [search]);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const updateSearch = useCallback(
    (updates: Partial<CarFilters>, immediate = false) => {
      clearTimeout(debounceRef.current);
      const apply = () =>
        navigate({
          search: (prev) => ({ ...prev, ...updates }),
          replace: true,
        });
      immediate ? apply() : (debounceRef.current = setTimeout(apply, 400));
    },
    [navigate],
  );
  const { data: brands = [] } = useBrands();
  const { data: models = [] } = useModels(search.brand);

  const { data: cars } = useCars(search);

  return (
    <form
      className={styles.singleRowForm}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <form.Field name="brand">
        {(field) => (
          <div className={styles.formGroup}>
            <label htmlFor="brand">Marka</label>
            <select
              id="brand"
              value={field.state.value}
              onChange={(e) => {
                // field.handleChange(e.target.value);
                const brand = e.target.value;
                field.handleChange(brand);
                form.setFieldValue("model", ""); // reset dependent field
                // clear model in URL in the SAME navigation as brand change
                updateSearch({ brand, model: "" }, true);
              }}
            >
              <option value="">Izvēlieties marku</option>
              {brands.data?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </form.Field>

      <form.Field name="model">
        {(field) => (
          <div className={styles.formGroup}>
            <label htmlFor="modelId">Modelis</label>
            <select
              id="model"
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value);
                updateSearch({ model: e.target.value }, true);
              }}
              disabled={!form.state.values.brand}
            >
              <option value="">Izvēlieties modeli</option>

              {models.map((model) => (
                <option key={model._id} value={model._id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </form.Field>
      <GoldButton onClick={() => setShowMore(!showMore)}>
        {showMore ? "Mazāk..." : "Vairāk..."}
      </GoldButton>
      {showMore && <div>fasdf</div>}
    </form>
  );
};
export default CarFilter;
