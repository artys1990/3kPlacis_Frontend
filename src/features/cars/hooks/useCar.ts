import { useQuery } from "@tanstack/react-query";
import { getCar } from "../api/getCar";

export function useCar(carId: string) {
  return useQuery({
    queryKey: ["cars", carId],
    queryFn: () => getCar(carId),
  });
}
