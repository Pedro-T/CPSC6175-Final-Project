import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import APIService from "../services/APIService";
import './RegionsPage.css';

const RegionsPage = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const regions = [
        { name: 'Africa', subregions: ['North Africa', 'Sub-Saharan Africa', 'East Africa', 'West Africa', 'Central Africa', 'Southern Africa'] },
        { name: 'Asia', subregions: ['Central Asia', 'East Asia', 'South Asia', 'Southeast Asia', 'West Asia (Middle East)'] },
        { name: 'Europe', subregions: ['Northern Europe', 'Western Europe', 'Central Europe', 'Southern Europe', 'Eastern Europe'] },
        { name: 'North America', subregions: ['North America', 'Central America', 'The Caribbean'] },
        { name: 'Oceania', subregions: ['Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia'] },
        { name: 'South America', subregions: ['South America'] }
    ];

    const fetchCountriesByRegion = (region) => {
        setLoading(true);
        setError('');
        setSelectedRegion(region);
        APIService.getCountriesByRegion(region)
            .then(response => {
                setCountries(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Error fetching countries for ${region}.`);
                setLoading(false);
                setCountries([]);
            });
    };

    return (
        <div className="regions-page">
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/countries">Countries</Link>
                    <Link to="/demographics">Demographics</Link>
                </nav>
            </header>

            <h1>Regions</h1>

            <div className="region-lists">
                {regions.map(continent => (
                    <div key={continent.name} className="continent">
                        <h2>{continent.name}</h2>
                        <ul>
                            {continent.subregions.map(region => (
                                <li key={region}>
                                    <button onClick={() => fetchCountriesByRegion(region)}>
                                        {region}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {selectedRegion && !loading && (
                <div className="country-data">
                    <h3>{selectedRegion} Countries</h3>
                    <ul>
                        {countries.length > 0 ? (
                            countries.map((country, index) => (
                                <li key={index}>{country.nameCommon}</li>
                            ))
                        ) : (
                            <p>No countries found for this region.</p>
                        )}
                    </ul>
                </div>
            )}

            <footer>
                <p>World Explorer</p>
            </footer>
        </div>
    );
};

export default RegionsPage;
