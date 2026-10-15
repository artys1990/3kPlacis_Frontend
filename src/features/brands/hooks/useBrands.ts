import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../api/getBrands";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 60 * 60 * 1000, // brands rarely change — cache an hour
  });
}
