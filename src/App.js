import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './react/src/components/HomePage';
import CountriesPage from "./react/src/components/CountriesPage";
import CountryDetailPage from "./react/src/components/CountryDetailPage";
import RegionsPage from "./react/src/components/RegionsPage";
import DemographicsPage from "./react/src/components/DemographicsPage";
import './App.css';

const App = () => {
    return (
        <Router>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/countries">Countries</Link></li>
                    <li><Link to="/regions">Regions</Link></li>
                    <li><Link to="/demographics">Demographics</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/country/:cca2" element={<CountryDetailPage />} />
                <Route path="/regions" element={<RegionsPage />} />
                <Route path="/demographics" element={<DemographicsPage />} />
                {/* Redirect all other paths to home */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
