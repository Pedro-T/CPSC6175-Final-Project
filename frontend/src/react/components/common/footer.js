import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>World Explorer</p>
            <div className="footer-links">
                <Link to="/countries" className="footer-link">Countries</Link>
                <Link to="/regions" className="footer-link">Regions</Link>
                <Link to="/demographics" className="footer-link">Demographics</Link>
            </div>
        </footer>
    );
};

export default Footer;
