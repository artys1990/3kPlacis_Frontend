import { useEffect } from "react";
import CarCard from "./CarCard";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useCars } from "../hooks/useCars";
import { Pagination } from "./Pagination";
import CarFilter from "#/features/components/UI/CarFilter.tsx";

const CarResults = () => {
  const { page, brand, model } = useSearch({ from: "/_public/browse" });
  //const [page, setPage] = useState(2);
  // const { page } = useSearch({ from: "/_public/browse" });
  const navigate = useNavigate();

  const selectedBrand = brand ?? "";
  const selectedModel = model ?? "";

  const handleBrandChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        brand: value || undefined,
        model: undefined,
        page: 1,
      }),
      replace: true,
    });
  };

  const handleModelChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        model: value || undefined,
        page: 1,
      }),
      replace: true,
    });
  };

  const cars = useCars({ page, brand, model });

  useEffect(() => {
    if (!cars.data) return;

    const lastPage = Math.max(1, cars.data.pages);

    if (page > lastPage) {
      navigate({
        search: (prev) => ({
          ...prev,
          page: lastPage,
        }),
        replace: true,
      });
    }
  }, [cars.data, page, navigate]);

  if (cars.isLoading) return <p>Loading...</p>;
  if (cars.isError) return <p>Kļūda! {cars.error.message}</p>;
  if (cars.data.total === 0)
    return (
      <>
        <CarFilter
          brandVal={selectedBrand}
          modelVal={selectedModel}
          handleBrand={handleBrandChange}
          handleModel={handleModelChange}
        />
        <p>Nav atrasta neviena automašīna pēc noteiktajiem kritērijiem</p>
      </>
    );
  return (
    <>
      <CarFilter
        brandVal={selectedBrand}
        modelVal={selectedModel}
        handleBrand={handleBrandChange}
        handleModel={handleModelChange}
      />
      <div className="card-grid">
        {cars?.data.cars.map((car) => (
          <div className="card" key={car._id}>
            <CarCard
              key={car._id}
              brand={car.model.brand.name}
              model={car.model.name}
              fuel={car.engineType}
              mileage={car.odometer}
              price={car.price}
              transmission={car.transmission}
              year={car.year}
              image={car.images[0]}
              id={car._id}
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination page={cars?.data.page} pages={cars?.data.pages} />
      </div>
    </>
  );
};
export default CarResults;
