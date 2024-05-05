import React, { useState } from 'react';
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import './CountriesPage.css';
import './common/CommonPageElements.css'
import useCountryStore from '../../store/useCountryStore';


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
        <div className="page">
            <Navbar />
            <div className="title-container">
                <h1 className="page-title">Countries</h1>
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
                        <h1>{countryDetails.nameCommon}</h1>
                        <p><img className="flag" src={countryDetails.flagUrl} alt={countryDetails.flagAltText}/></p>
                        <p><strong>Official Name:</strong> {countryDetails.nameOfficial}</p>
                        <p><strong>CCA2:</strong> {countryDetails.cca2}</p>
                        <p><strong>Capital:</strong> {countryDetails.capital || "None"}</p>
                        <p><strong>Region:</strong> {countryDetails.region || "None"}</p>
                        <p><strong>Languages:</strong> {countryDetails.languages.length > 0 ? countryDetails.languages.join(", ") : "None"}</p>
                        <p><strong>Population Size:</strong> {countryDetails.population.toLocaleString() || "None"}</p>
                        <p><strong>Currencies:</strong> {countryDetails.currencies.length > 0 ? countryDetails.currencies.join(", ") : "None"}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CountriesPage;
