import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>World Explorer</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/countries">Countries</Link></li>
                    <li><Link to="/regions">Regions</Link></li>
                    <li><Link to="/demographics">Demographics</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
