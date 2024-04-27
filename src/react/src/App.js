import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import CountriesPage from "./components/CountriesPage";
import RegionsPage from "./components/RegionsPage";
import DemographicsPage from "./components/DemographicsPage";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/regions" element={<RegionsPage />} />
                <Route path="/demographics" element={<DemographicsPage />} />
                {/* Redirect all other paths to home */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
