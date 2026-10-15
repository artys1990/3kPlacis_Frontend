import {
  FaCamera,
  FaPhoneAlt,
  FaTools,
  FaFileAlt,
  FaCar,
  FaAd,
} from "react-icons/fa";
import styles from "./ComTrade.module.css";

const features = [
  {
    icon: <FaCamera />,
    title: "Profesionālu auto prezentāciju",
    description:
      "Sagatavosim kvalitatīvas fotogrāfijas un pārdomātu sludinājumu, lai auto piesaistītu potenciālo pircēju uzmanību.",
  },
  {
    icon: <FaAd />,
    title: "Reklamēšanu un pircēju piesaisti",
    description:
      "Izvietosim sludinājumu atbilstošos auto tirdzniecības portālos un nodrošināsim komunikāciju ar interesentiem.",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Saziņu ar potenciālajiem pircējiem",
    description:
      "Atbildēsim uz pircēju jautājumiem, organizēsim auto apskates un veiksim sarunas ar interesentiem.",
  },
  {
    icon: <FaTools />,
    title: "Auto sagatavošanu pārdošanai",
    description:
      "Ja nepieciešams, varam palīdzēt sagatavot auto pārdošanai: salona un virsbūves tīrīšana; pulēšana; servisa darbi un nepieciešamie remonti.",
  },
  {
    icon: <FaFileAlt />,
    title: "Darījuma noformēšanu",
    description:
      "Palīdzēsim ar nepieciešamajiem dokumentiem un pārdošanas procesa organizēšanu.",
  },
];

export default function ComTrade() {
  return (
    <section className={styles.commissionSection}>
      <div className={styles.commissionContainer}>
        {/* Header */}
        <div className={styles.commissionHeader}>
          <h1>AUTO KOMISIJAS TIRDZNIECĪBA</h1>

          <p>
            Vēlaties pārdot savu auto bez liekām rūpēm un laika tērēšanas?
            Uzticiet auto pārdošanu Mums.
          </p>

          <p>
            Mēs parūpēsimies par visu pārdošanas procesu – sākot no auto
            sagatavošanas un kvalitatīva sludinājuma izveides līdz pircēja
            atrašanai un darījuma noformēšanai.
          </p>
        </div>
        <h3>KO MĒS PIEDĀVĀJAM?</h3>
        {/* Features */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              className={`${styles.feature} ${
                index !== features.length - 1 ? "feature-border" : ""
              }`}
              key={feature.title}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>

              <div className={styles.featureContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}

          {/* <h3>KĀDU AUTO PIEŅEMAM KOMISIJĀ? </h3>
        <div>
          <p>Lai auto būtu piemērots komisijas tirdzniecībai, vēlams, lai: </p>
          <ul>
            <li>Auto būtu labā vizuālā un tehniskā stāvoklī;</li>
            <li>Būtu vismaz 6 mēneši derīga tehniskā apskate;</li>
            <li>
              Auto būtu iespējams noņemt no uzskaites / noformētpārdošanu;
            </li>
            <li>Būtu pieejami auto dokumenti un atslēgas. </li>
          </ul>
          <p>
            Katru auto izvērtējam individuāli, ņemot vērā tā stāvokli,
            komplektāciju, nobraukumu, tirgus pieprasījumu un paredzamo
            pārdošanas cenu.
          </p> */}
        </div>
        <section className={styles.carRequirements}>
          <div className={styles.requirementsHeader}>
            <span className={styles.requirementsIcon}>✓</span>

            <div>
              <h3>KĀDU AUTO PIEŅEMAM KOMISIJĀ?</h3>
              <p>
                Lai auto būtu piemērots komisijas tirdzniecībai, vēlams, lai:
              </p>
            </div>
          </div>

          <ul className={styles.requirementsList}>
            <li>
              <span className={styles.check}>✓</span>
              <span>Auto būtu labā vizuālā un tehniskā stāvoklī;</span>
            </li>

            <li>
              <span className={styles.check}>✓</span>
              <span>Būtu vismaz 6 mēneši derīga tehniskā apskate;</span>
            </li>

            <li>
              <span className={styles.check}>✓</span>
              <span>
                Auto būtu iespējams noņemt no uzskaites / noformēt pārdošanu;
              </span>
            </li>

            <li>
              <span className={styles.check}>✓</span>
              <span>Būtu pieejami auto dokumenti un atslēgas.</span>
            </li>
          </ul>
        </section>

        {/* Bottom line */}
        <div className={styles.commissionFooter}>
          <span className={styles.footerLine} />

          <div className={styles.footerMessage}>
            <FaCar />
            <span>JŪSU AUTO – MŪSU DARBS.</span>
          </div>

          <span className={styles.footerLine} />
        </div>
      </div>
    </section>
  );
}
