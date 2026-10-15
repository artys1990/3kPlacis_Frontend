import { useForm } from "@tanstack/react-form";
import { getModels } from "../../brands/api/getModels";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useBrands } from "../../brands/hooks/useBrands";
//import { useModels, useModelsAndWait } from "../../brands/hooks/useModels";
import styles from "./QuickSearch.module.css";

const QuickSearch = () => {
  const navigate = useNavigate();
  const brands = useBrands();
  // const modelsQueryWait = useModelsAndWait("");
  //  const modelsQuery = useModels(""); //izmantots lai mēģinātu search parameterus attēlot kā vērtības nevis ID

  const form = useForm({
    defaultValues: {
      brandId: "",
      modelId: "",
    },
    onSubmit: async ({ value }) => {
      // const brand = brands.data?.find((b) => b._id === value.brandId);
      // const model = modelsQuery.data?.find((m) => m._id === value.modelId);

      navigate({
        to: "/browse",
        search: {
          // brand: brand?._id,
          // model: model?._id,
          brand: value.brandId || undefined,
          model: value.modelId || undefined,
        },
      });
    },
  });

  return (
    <form
      className={styles.singleRowForm}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Subscribe selector={(state) => state.values.brandId}>
        {(brandId) => {
          const modelsQuery = useQuery({
            queryKey: ["models", brandId],
            queryFn: () => getModels(brandId),
            enabled: !!brandId,
          });
          return (
            <>
              <form.Field name="brandId">
                {(field) => (
                  <div className={styles.formGroup}>
                    <label htmlFor="brandId">Marka</label>
                    <select
                      id="brandId"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
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

              <form.Field name="modelId">
                {(field) => (
                  <div className={styles.formGroup}>
                    <label htmlFor="modelId">Modelis</label>
                    <select
                      id="modelId"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={!form.state.values.brandId}
                    >
                      <option value="">Izvēlieties modeli</option>

                      {modelsQuery.data?.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form.Field>
              <div className={"${styles.formGroup, ${styles.buttonGroup}"}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!brandId}
                >
                  Meklēt
                </button>
              </div>
            </>
          );
        }}
      </form.Subscribe>
    </form>
  );
  {
  }
};
export default QuickSearch;
