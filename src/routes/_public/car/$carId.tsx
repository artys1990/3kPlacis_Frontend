import { createFileRoute } from "@tanstack/react-router";
import { useCar } from "../../../features/cars/hooks/useCar";
import ImageGallery from "../../../features/components/UI/ImageGallery";
import { formatPrice, formatMileage } from "../../../lib/functions";
import CarEquipment from "../../../features/cars/components/CarEquipment";

export const Route = createFileRoute("/_public/car/$carId")({
  component: CarComponent,
});

function CarComponent() {
  const { carId } = Route.useParams();
  const car = useCar(carId);
  if (car.isLoading) return <p>Loading...</p>;
  if (car.isError) return <p>Kļūda! {car.error.message}</p>;
  return (
    <div>
      <div className="car-title-container">
        <h2 className="car-title">
          {car.data?.model.brand.name} {car.data?.model.name}
        </h2>
        <h3 className="car-price-title">{formatPrice(car.data?.price)}</h3>
      </div>
      <div>
        <ImageGallery
          images={car.data?.images}
          altPrefix={car.data?.model.name}
        />
      </div>
      <h3 className="car-section-title">Pamatinformācija</h3>
      <div className="car-description-container">
        <dl className="two-column-list">
          <dt>Dzinējs:</dt>
          <dd>
            {(Math.round(car.data?.engineVolume * 10) / 10).toFixed(1)}
            {"L "}
            {car.data?.engineType}
          </dd>

          <dt>Ātrumkārba:</dt>
          <dd>{car.data?.transmission}</dd>

          <dt>Pirmā Reģistrācija:</dt>
          <dd>{car.data?.year}</dd>

          <dt>Nobraukums:</dt>
          <dd>{formatMileage(car.data?.odometer)} km</dd>

          <dt>Jauda:</dt>
          <dd>
            {car.data?.power || 0} KW /{" "}
            {Math.ceil(Number(car.data?.power) * 1.341) || 0} ZS
          </dd>
        </dl>

        <dl className="two-column-list">
          <dt>Tehniskā Apskate:</dt>
          <dd>{car.data?.iinspectionDate || "Nav"}</dd>

          <dt>Piedziņa:</dt>
          <dd>{car.data?.driveTrain}</dd>

          <dt>Krāsa:</dt>
          <dd>{car.data?.color}</dd>

          <dt>Sēdvietas:</dt>
          <dd>{car.data?.seats}</dd>
          {/* <dt>Virsbūves Tips:</dt>
          <dd>{car.data?.bodyType}</dd> */}

          <dt>VIN Kods:</dt>
          <dd>{car.data?.vin || "-"}</dd>
        </dl>
      </div>
      <h3 className="car-section-title">Papildus Informācija</h3>
      <div className="car-description-container">
        <p>{car.data?.description}</p>
      </div>
      <h3 className="car-section-title">Aprīkojums</h3>
      <div className="car-description-container">
        <CarEquipment equipment={car.data.equipment} />
      </div>
    </div>
  );
}
