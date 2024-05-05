import React, { useState } from 'react';
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import useDemographicsStore from '../../store/useDemographicsStore';
import './DemographicsPage.css';
import './common/CommonPageElements.css'


const DemographicsPage = () => {
    const languages = [
        'English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian',
        'Hindi', 'Bengali', 'Portuguese', 'Japanese', 'German', 'Korean',
        'Turkish', 'Vietnamese', 'Italian', 'Polish', 'Ukrainian', 'Dutch',
        'Thai', 'Swedish', 'Indonesian', 'Persian', 'Romanian', 'Greek',
        'Czech', 'Hungarian', 'Danish', 'Finnish', 'Norwegian', 'Slovak'
    ];
    const currencies = [
        'USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
        'INR', 'BRL', 'RUB', 'KRW', 'MXN', 'SGD', 'HKD', 'NOK', 'SAR', 'TRY',
        'ZAR', 'THB', 'AED', 'COP', 'PLN', 'IDR', 'EGP', 'MYR', 'PHP', 'CLP'
    ];

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const {
        countriesByLanguage,
        countriesByCurrency,
        fetchCountriesByLanguage,
        fetchCountriesByCurrency,
        loading,
        error,
    } = useDemographicsStore();

    const handleLanguageSubmit = async (selectedLanguage) => {
        setSelectedCurrency('');
        setSelectedLanguage(selectedLanguage);
        try {
            await fetchCountriesByLanguage(selectedLanguage);
        } catch (error) {
            console.error('Failed to fetch countries for language:', error);
        }
    };

    const handleCurrencySubmit = async (selectedCurrency) => {
        setSelectedLanguage('');
        setSelectedCurrency(selectedCurrency);
        try {
            await fetchCountriesByCurrency(selectedCurrency);
        } catch (error) {
            console.error('Failed to fetch countries for currency:', error);
        }
    };

    return (
        <div className="page">
            <Navbar />
            <div className="title-container">
                <h1 className="page-title">Demographics</h1>
            </div>
            <div className="search-areas">
                {/* Search by language */}
                <div className="search-area">
                    <label htmlFor="language-search">Search by language:</label>
                    <select
                        id="language-search"
                        value={selectedLanguage}
                        onChange={(e) => handleLanguageSubmit(e.target.value)}>
                        <option value="">Select a language</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>{language}</option>
                        ))}
                    </select>
                </div>

                <div className="search-area">
                    <label htmlFor="currency-search">Search by currency:</label>
                    <select
                        id="currency-search"
                        value={selectedCurrency}
                        onChange={(e) => handleCurrencySubmit(e.target.value)}>
                        <option value="">Select a currency</option>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="results">
                {countriesByLanguage.length > 0 && (
                    <div>
                        <h2>Countries speaking the selected language:</h2>
                        <ul>
                            {countriesByLanguage.map((country, index) => (
                                <li key={index}>{country.nameCommon || 'Unnamed Country'}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {countriesByCurrency.length > 0 && (
                    <div>
                        <h2>Countries using the selected currency:</h2>
                        <ul>
                            {countriesByCurrency.map((country, index) => (
                                <li key={index}>{country.nameCommon || 'Unnamed Country'}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DemographicsPage;
