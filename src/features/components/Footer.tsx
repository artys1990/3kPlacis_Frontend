import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-contacts">
        <h4
          style={{
            textDecoration: "underline",
            gridColumn: "1/3",
            display: "inline-block",
            justifySelf: "center",
          }}
        >
          Kontakti:
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "16px",
          }}
        >
          <p>3K PLACIS, SIA</p>
          <span>
            <Phone size={16} style={{ marginRight: "0.5em" }} /> +371 20 772 700
          </span>
          <span>
            <Mail size={16} style={{ marginRight: "0.7em" }} />
            3kplacis@gmail.com
          </span>
        </div>
        <div>
          <span style={{ textDecoration: "underline" }}>Adrese: </span>
          "Lejas", Pelču pagasts, <br />
          Kuldīgas novads, <br />
          LV-3301
        </div>
      </div>
      <img src="3k_logo.png" className="footer-logo" alt="logo" />
      <div className="footer-working-hours">
        <h4
          style={{
            textDecoration: "underline",
            gridColumn: "1/3",
            display: "inline-block",
            justifySelf: "center",
          }}
        >
          Darba Laiks:
        </h4>
        <p>Darba dienas: 9:00 - 18:00</p>
        <p>Sestdienas: 10:00 - 14:00</p>
        <p>Svētdienas: -</p>
      </div>
      <div className="footer-social">
        <span>
          <a href="http://facebook.com/3kplacis" target="blank">
            <img src="facebook-icon.svg" alt="facebook" />
            @3kplacis
          </a>
        </span>
        <span>
          <a href="http://instagram.com/3kplacis" target="blank">
            <img src="instagram-icon.svg" alt="facebook" /> @3kplacis
          </a>
        </span>
        <span>
          <a href="http://tiktok.com/@3kplacis" target="blank">
            <img src="tiktok-icon.svg" alt="facebook" />
            @3kplacis
          </a>
        </span>
      </div>
    </footer>
  );
};
export default Footer;
