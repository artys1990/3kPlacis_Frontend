import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import CarResults from "../../features/cars/components/CarResults";
import CarFilter from "../../features/components/UI/CarFilter";
// import CarCard from "../../features/cars/components/CarCard";
// import { useCars } from "../../features/cars/hooks/useCars";

const carFilterSchema = z.object({
  brand: z.string().catch(""),
  model: z.string().catch(""),
  minPrice: z.coerce.number().min(0).catch(0),
  maxPrice: z.coerce.number().min(0).catch(200000),
  transmission: z.enum(["", "Automātiska", "Manuāla"]).catch(""),
  minYear: z.coerce.number().min(0).catch(0),
  maxYear: z.coerce.number().min(0).catch(2040),
  engineType: z
    .enum(["", "Benzīns", "Dīzelis", "Hibrīds", "Elektrisks"])
    .catch(""),
  page: z.coerce.number().min(1).catch(1),
});

export type CarFilters = z.infer<typeof carFilterSchema>;

export const Route = createFileRoute("/_public/browse")({
  // validateSearch: (search) => ({
  //   brand: search.brand as string | undefined,
  //   model: search.model as string | undefined,
  //   minPrice: search.minPrice ? Number(search.minPrice) : undefined,
  //   maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
  //   minYear: search.minYear ? Number(search.minYear) : undefined,
  //   maxYear: search.maxYear ? Number(search.maxYear) : undefined,
  //   engineType: search.fuel as string | undefined,
  //   transmission: search.transmission as string | undefined,
  // }),
  //validateSearch: carFilterSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CarResults />
    </>
  );
}
