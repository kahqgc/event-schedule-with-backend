import { Link } from "react-router";
import "./Header.css";

export default function Header() {
    return (
            <nav className="header-container">
                <h1 className="site-title"> EarthPulse </h1>
                <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/pages/About">About</Link>
                <Link to="/pages/Schedule">Event Schedule</Link>
                </div>
            </nav>
    )

}