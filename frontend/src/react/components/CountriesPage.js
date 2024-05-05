import React, { useState } from 'react';
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import './CountriesPage.css';
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
        <div className="countries-page">
            <Navbar />
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
                        <h1>{countryDetails.nameCommon}</h1>
                        <p><img src={countryDetails.flagUrl}/></p>
                        <p><strong>Official Name:</strong> {countryDetails.nameOfficial}</p>
                        <p><strong>CCA2:</strong> {countryDetails.cca2}</p>
                        <p><strong>Capital:</strong> {countryDetails.capital}</p>
                        <p><strong>Region:</strong> {countryDetails.region}</p>
                        <p><strong>Languages:</strong> {countryDetails.languages}</p>
                        <p><strong>Population Size:</strong> {countryDetails.population}</p>
                        <p><strong>Currencies:</strong> {countryDetails.currencies}</p>
                        <p><strong>Flag Description:</strong> {countryDetails.flagAltText}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CountriesPage;
