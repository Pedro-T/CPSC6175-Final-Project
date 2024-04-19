import React from 'react';
import './CountriesPage.css';

const countriesByRegion = {
    'North America': ['United States', 'Canada', 'Mexico'],
    'Europe': ['France', 'Germany', 'Spain'],
    'Africa': ['Nigeria', 'South Africa', 'Egypt'],
    'Asia': ['China', 'India', 'Japan'],
    'Oceania': ['Australia', 'New Zealand', 'Fiji'],
    'South America': ['Brazil', 'Argentina', 'Colombia'],
};

const CountriesPage = () => {
    return (
        <div className="countries-page">
            <h1>Countries</h1>
            <div className="regions-container">
                {Object.entries(countriesByRegion).map(([region, countries]) => (
                    <div key={region} className="region">
                        <h2>{region}</h2>
                        <ul>
                            {countries.map(country => (
                                <li key={country}>
                                    <a
                                        href={`/country/${encodeURIComponent(country)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {country}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountriesPage;
