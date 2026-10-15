import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="main-nav">
      <button
        className={`nav-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={isOpen ? "open" : ""}>
        <li>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Sākums
          </Link>
        </li>
        <li>
          <Link
            to="/browse"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Katalogs
          </Link>
        </li>
        <li>
          <Link
            to="/com-trade"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Komisijas tirdzniecība
          </Link>
        </li>
        <li>
          <Link
            to="/leasing"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Auto kredīts
          </Link>
        </li>
        <li>
          <Link
            to="/contacts"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Kontakti
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default MainNav;
