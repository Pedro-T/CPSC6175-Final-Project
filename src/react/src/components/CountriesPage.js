import React, { useState } from 'react';
import './CountriesPage.css';
import useCountryStore from '../../../store/useCountryStore';
import { Link } from 'react-router-dom';

const CountriesPage = () => {
    const { countryDetails, fetchCountryDetails, loading, error } = useCountryStore();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        await fetchCountryDetails(searchTerm);
    };

    return (
        <div className="countries-page">
            <nav className="navigation-cp">
                <Link to="/countries" className="nav-link">Countries</Link>
                <Link to="/regions" className="nav-link">Regions</Link>
                <Link to="/demographics" className="nav-link">Demographics</Link>
                <Link to="/" className="nav-home">Home</Link>
            </nav>
            <div className="title-container">
                <h1 className="title-cp">Countries</h1>
            </div>
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter the name of the country"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            <div className="search-results">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {countryDetails && (
                    <div className="search-result">
                        <h3>{countryDetails.name}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountriesPage;
