import React, { useEffect } from 'react';
import './CountriesPage.css';
import useCountryListStore from '../../../store/useCountryListStore';

const CountriesPage = () => {
    const { countryList, fetchCountryList } = useCountryListStore();

    useEffect(() => {
        if (countryList.length === 0) {
            fetchCountryList();
        }
    }, [countryList, fetchCountryList]);


    return (
        <div className="countries-page">
            <h1>Countries</h1>
            <div className="regions-container">
                {countryList.map((regionData) =>
                    <div key={regionData.region} className="region">
                        <h2>{regionData.region}</h2>
                        <ul>
                            {regionData.countries.map(country => (
                                <li key={country.name}>
                                    <a
                                        href={`/country/${encodeURIComponent(country.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {country.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountriesPage;
