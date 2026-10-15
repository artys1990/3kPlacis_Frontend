import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="contacts-container">
      <h2 className="contacts-title">Kontakti</h2>
      <section className="contacts-section-container">
        <div>
          <h3>"3K PLACIS", SIA</h3>
          <p>Tālrunis: +371 20 772 700</p>
          <p>epasts: 3kplacis@gmail.com</p>
          <p>Adrese: "Lejas", Pelču pagasts, Kuldīgas novads, LV-3301</p>
        </div>
        <div>
          <h3>Darba Laiks</h3>
          <p>Darba dienas: 9:00 - 18:00</p>
          <p>Sestdienas: 10:00 - 14:00</p>
          <p>Svētdienas: -</p>
        </div>
      </section>
      <h3 style={{ marginTop: "1rem" }}>Rekvizīti</h3>
      <section className="contacts-section-container">
        <div>
          <p>"3K PLACIS", SIA</p>
          <p>
            <b>Reģ. Nr.: </b>LV40203715952
          </p>
          <p>
            <b>Juridiskā adrese: </b>Planīcas iela 54 - 7, Kuldīga, Kuldīgas
            novads, LV-3301
          </p>
          <p>
            <b>Faktiskā Adrese: </b>"Lejas", Pelču pagasts, Kuldīgas novads,
            LV-3301
          </p>
          <p>
            <b>Norēķinu konts:</b> A/S "Swedbank" LV62HABA0551064076422
          </p>
        </div>
      </section>
      <section className="contacts-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.4011367747403!2d21.998940313030154!3d56.94192837343715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46efdb3566e63d9b%3A0xb50bb039e7b95b9c!2s3K%20Placis!5e0!3m2!1slv!2slv!4v1791355493702!5m2!1slv!2slv"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="map"
        ></iframe>
      </section>
    </div>
  );
}
