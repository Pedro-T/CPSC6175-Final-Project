import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false)

    return (
        <nav className="navigation-cp">
            <button className="toggle-navbar" onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'Close' : 'Menu'}</button>
            <div className={navOpen ? "" : "nav-hidden"}>
                <Link to="/countries" className="nav-link">Countries</Link>
                <Link to="/regions" className="nav-link">Regions</Link>
                <Link to="/demographics" className="nav-link">Demographics</Link>
                <Link to="/" className="nav-home">Home</Link>
            </div>
        </nav>
    );
};

export default Navbar;