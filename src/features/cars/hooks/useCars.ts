import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCars, getFilterParams } from "../api/getCars";

export function useCars(params) {
  return useQuery({
    queryKey: ["cars", params],
    queryFn: () => getCars(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60, //adjustable
    // staleTime: 0, //adjustable
    // refetchOnMount: "always",
  });
}

export function useCarFilters() {
  return useQuery({
    queryKey: ["car-filter-options"],
    queryFn: () => getFilterParams(),
  });
}
