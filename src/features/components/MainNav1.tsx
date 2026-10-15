import { Link } from "@tanstack/react-router";

const MainNav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Sākums
          </Link>
        </li>
        <li>
          <Link to="/browse" className="nav-link">
            Katalogs
          </Link>
        </li>
        <li>
          <Link to="/com-trade" className="nav-link">
            Komisijas tirdzniecība
          </Link>
        </li>
        <li>
          <Link to="/leasing" className="nav-link">
            Auto kredīts
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="nav-link">
            Kontakti
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MainNav;
