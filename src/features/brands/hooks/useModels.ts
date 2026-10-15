import { useQuery } from "@tanstack/react-query";
import { getModels } from "../api/getModels";

export function useModelsAndWait(brandId: string) {
  return useQuery({
    queryKey: ["models", brandId],
    queryFn: () => getModels(brandId),
    enabled: !!brandId,
  });
}
export function useModels(brandId: string) {
  return useQuery({
    queryKey: ["models", brandId],
    queryFn: () => getModels(brandId),
    // enabled: !!brandId,
  });
}
