import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navigation-cp">
            <Link to="/countries" className="nav-link">Countries</Link>
            <Link to="/regions" className="nav-link">Regions</Link>
            <Link to="/demographics" className="nav-link">Demographics</Link>
            <Link to="/" className="nav-home">Home</Link>
        </nav>
    );
};

export default Navbar;