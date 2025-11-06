import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav className="header-container">
        <h1 className="site-title"> EarthPulse </h1>
        <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/schedule">Event Schedule</Link>
        </div>
      </nav>
    </header>
  );
}
