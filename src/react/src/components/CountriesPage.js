import React, { useEffect } from 'react';
import './CountriesPage.css';
import useCountryListStore from '../../../store/useCountryListStore';
import {Link} from "react-router-dom";

const CountriesPage = () => {
    const { countryList, fetchCountryList } = useCountryListStore();

    useEffect(() => {
        if (countryList.length === 0) {
            fetchCountryList();
        }
    }, [countryList, fetchCountryList]);


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
