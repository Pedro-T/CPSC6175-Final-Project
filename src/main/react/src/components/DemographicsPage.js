import React, { useState } from 'react';
import APIService from "../services/APIService";
import './DemographicsPage.css';

const DemographicsPage = () => {
    // Hardcoded lists for languages and currencies
    const languages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian'];
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [countriesByLanguage, setCountriesByLanguage] = useState([]);
    const [countriesByCurrency, setCountriesByCurrency] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLanguageSubmit = () => {
        if (!selectedLanguage) return;
        setLoading(true);
        setError('');
        // API call to fetch countries by language
        APIService.getCountriesByLanguage(selectedLanguage)
            .then(response => {
                setCountriesByLanguage(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching countries by language');
                setLoading(false);
            });
    };

    const handleCurrencySubmit = () => {
        if (!selectedCurrency) return;
        setLoading(true);
        setError('');
        // API call to fetch countries by currency
        APIService.getCountriesByCurrency(selectedCurrency)
            .then(response => {
                setCountriesByCurrency(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching countries by currency');
                setLoading(false);
            });
    };

    return (
        <div className="demographics-page">
            <h1>Demographics</h1>
            <div className="search-areas">
                <div className="search-area">
                    <label htmlFor="language-search">Search by language:</label>
                    <select
                        id="language-search"
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value)}
                    >
                        <option value="">Select a language</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleLanguageSubmit}>Submit</button>
                </div>

                <div className="search-area">
                    <label htmlFor="currency-search">Search by currency:</label>
                    <select
                        id="currency-search"
                        value={selectedCurrency}
                        onChange={e => setSelectedCurrency(e.target.value)}
                    >
                        <option value="">Select a currency</option>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleCurrencySubmit}>Submit</button>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="results">
                {countriesByLanguage.length > 0 && (
                    <div>
                        <h2>Countries speaking {selectedLanguage}:</h2>
                        <ul>
                            {countriesByLanguage.map((country, index) => (
                                <li key={index}>{country.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {countriesByCurrency.length > 0 && (
                    <div>
                        <h2>Countries using {selectedCurrency}:</h2>
                        <ul>
                            {countriesByCurrency.map((country, index) => (
                                <li key={index}>{country.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemographicsPage;
