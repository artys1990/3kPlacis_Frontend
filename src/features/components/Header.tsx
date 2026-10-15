import MainNav from "./MainNav";
import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <img className="main_logo" src="/3k_logo.png" alt="logo" />
      </Link>
      <MainNav />
      <div className="phone">
        <span
          style={{ color: "white", display: "flex", justifyContent: "center" }}
        >
          <Phone
            color="white"
            style={{ marginRight: "3px" }}
            className="phone-icon"
          />{" "}
          +371 20 772 700
        </span>
      </div>
    </header>
  );
};
export default Header;
