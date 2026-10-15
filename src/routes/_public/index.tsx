import { createFileRoute, useNavigate } from "@tanstack/react-router";
import QuickSearch from "../../features/components/UI/QuickSearch";
import CarCard from "../../features/cars/components/CarCard";
import BigGoldButton from "#/features/components/UI/BigGoldButton.tsx";
import Banner from "../../features/components/UI/Banner";
import { useCars } from "../../features/cars/hooks/useCars";
import DeliverCarSection from "../../features/components/UI/DeliverCarSection";

export const Route = createFileRoute("/_public/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const cars = useCars({ limit: 4 });

  if (cars.isLoading) return <p>Loading...</p>;
  if (cars.isError)
    return (
      <p className="loadingError">
        Diemžēl radusies kļūda! Lūdzu mēģiniet vēlāk.
      </p>
    );

  return (
    <>
      {/* <div className="quickSearch-container">
        <QuickSearch />
      </div> */}
      <DeliverCarSection />
      <div className="latest-container">
        <h3>Mūsu jaunumi</h3>
        <div className="latest-cards">
          {cars?.data.cars.map((car) => (
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
          ))}
        </div>
        <BigGoldButton
          text="Skatīt visas automašīnas"
          onClick={() => navigate({ to: "/browse" })}
          btnType=""
        />
      </div>
      <div className="banners-container">
        <Banner
          background="banner1.jpg"
          title="Tev ir auto ko vēlies pārdot, bet nav ne laika, ne vēlēšanās ar to nodarboties?"
          description="Pie mums var ne tikai iegādāties automašīnas, bet arī nodot tās mums komisijas tirdzniecībā. Uzticot mums sava auto 
tirdzniecību, mēs atradīsim pircēju Jūsu automašīnai, tādējādi Jums nebūs jātērē savs laiks."
          button="UZZINĀT VAIRĀK"
          buttonClick={() => navigate({ to: "/com-trade" })}
        />
        <Banner
          background="/banner2.jpg"
          title="Nepieciešams finansējumus auto iegādei?"
          description="Ja pietrūkst līdzekļi izvēlētajai automašīnai,
iespējams to arī iegādāties līzingā."
          button="NOSKAIDRO SAVAS KREDĪĪTIESPĒJAS"

          buttonClick={() => navigate({ to: "/leasing" })}
        />
      </div>
    </>
  );
}
