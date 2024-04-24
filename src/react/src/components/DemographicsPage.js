import React from 'react';
import useDemographicsStore from '../../../store/useDemographicsStore';
import './DemographicsPage.css';
import {Link} from "react-router-dom";

const DemographicsPage = () => {
    const languages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian'];
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];
    const {
        countriesByLanguage,
        countriesByCurrency,
        fetchCountriesByLanguage,
        fetchCountriesByCurrency,
        loading,
        error,
    } = useDemographicsStore();

    const handleLanguageSubmit = (selectedLanguage) => {
        fetchCountriesByLanguage(selectedLanguage);
    };

    const handleCurrencySubmit = (selectedCurrency) => {
        fetchCountriesByCurrency(selectedCurrency);
    };

    return (
        <div className="demographics-page">
            <nav className="navigation-dp">
                <Link to="/countries" className="nav-link">Countries</Link>
                <Link to="/regions" className="nav-link">Regions</Link>
                <Link to="/demographics" className="nav-link">Demographics</Link>
                <Link to="/" className="nav-home-dp">Home</Link>
            </nav>
            <div className="dp-title">
                <h1 className="title-dp">Demographics</h1>
            </div>
            <div className="search-areas">
                {/* Search by language */}
                <div className="search-area">
                    <label htmlFor="language-search">Search by language:</label>
                    <select id="language-search" onChange={(e) => handleLanguageSubmit(e.target.value)}>
                        <option value="">Select a language</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>{language}</option>
                        ))}
                    </select>
                </div>

                {/* Search by currency */}
                <div className="search-area">
                    <label htmlFor="currency-search">Search by currency:</label>
                    <select id="currency-search" onChange={(e) => handleCurrencySubmit(e.target.value)}>
                        <option value="">Select a currency</option>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {/* Results for languages */}
            <div className="results">
                {countriesByLanguage.length > 0 && (
                    <div>
                        <h2>Countries speaking the selected language:</h2>
                        <ul>
                            {countriesByLanguage.map((country, index) => (
                                <li key={index}>{country.name.common || 'Unnamed Country'}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Results for currencies */}
                {countriesByCurrency.length > 0 && (
                    <div>
                        <h2>Countries using the selected currency:</h2>
                        <ul>
                            {countriesByCurrency.map((country, index) => (
                                <li key={index}>{country.name.common || 'Unnamed Country'}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <footer className="footer-dp">
                <p>World Explorer</p>
                <div className="footer-links-dp2">
                    <Link to="/countries" className="footer-link-dp">Countries</Link>
                    <Link to="/regions" className="footer-link-dp">Regions</Link>
                    <Link to="/demographics" className="footer-link-dp">Demographics</Link>
                </div>
            </footer>
        </div>
    );
};

export default DemographicsPage;
