import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRegionsStore from '../../../store/useRegionsStore';
import './RegionsPage.css';

const RegionsPage = () => {
    const { selectAndFetchCountriesByRegion, selectedRegion, countries, loading, error } = useRegionsStore();
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: -0, y: 0 });

    const uiRegions = [
        { region: 'Africa', subregions: ['Northern Africa', 'Eastern Africa', 'Western Africa', 'Middle Africa', 'Southern Africa'] },
        { region: 'Asia', subregions: ['Central Asia', 'Eastern Asia', 'Southern Asia', 'Southeastern Asia', 'Western Asia'] },
        { region: 'Europe', subregions: ['Northern Europe', 'Western Europe', 'Central Europe', 'Southern Europe', 'Eastern Europe'] },
        { region: 'North America', subregions: ['North America', 'Central America', 'Caribbean'] },
        { region: 'Oceania', subregions: ['Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia'] },
        { region: 'South America', subregions: ['South America'] }
    ];

    const handleRegionClick = (region) => {
        selectAndFetchCountriesByRegion(region);
    };

    const handleMouseEnter = (country, event) => {
        setHoveredCountry(country);
        setTooltipPosition({
            x: event.target.getBoundingClientRect().right - 700,
            y: event.target.getBoundingClientRect().top
        });
    };

    const handleMouseLeave = () => {
        setHoveredCountry(null);
    };

    return (
        <div className="regions-page">
            <nav className="navigation-rp">
                <Link to="/countries" className="nav-link">Countries</Link>
                <Link to="/regions" className="nav-link">Regions</Link>
                <Link to="/demographics" className="nav-link">Demographics</Link>
                <Link to="/" className="nav-home-dp">Home</Link>
            </nav>
            <div className="rp-title">
                <h1 className="title-rp">Regions</h1>
            </div>
            <div className="region-lists">
                {uiRegions.map(continent => (
                    <div key={continent.region} className="region">
                        <h2 className="region-title clickable" onClick={() => handleRegionClick(continent.region)}>
                            {continent.region}
                        </h2>
                        <ul>
                            {continent.subregions.map(region => (
                                <li key={region} className="clickable" onClick={() => handleRegionClick(region)}>
                                    {region}
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
                                <li key={index}
                                    onMouseEnter={(e) => handleMouseEnter(country, e)}
                                    onMouseLeave={handleMouseLeave}>
                                    {country.nameCommon}
                                    {hoveredCountry === country && (
                                        <div className="country-tooltip" style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}>
                                            <p>{'Name: ' + country.nameCommon}</p>
                                            <p>{'Official Name: ' + country.nameOfficial}</p>
                                            <p>{'Country Code: ' + country.cca2}</p>
                                            <p>{'Population: ' + (country.population ? country.population.toLocaleString() : 'Unavailable')}</p>
                                            <p>{'Languages: ' + (country.languages ? country.languages.join(', ') : 'Unavailable')}</p>
                                            <p>{'Flag: ' + country.flagUrl}</p>
                                            <p>{country.flagAltText}</p>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No countries found for this region.</p>
                        )}
                    </ul>
                </div>
            )}

            <footer className="footer-rp">
                <p>World Explorer</p>
                <div className="footer-links-rp2">
                    <Link to="/countries" className="footer-link-rp">Countries</Link>
                    <Link to="/regions" className="footer-link-rp">Regions</Link>
                    <Link to="/demographics" className="footer-link-rp">Demographics</Link>
                </div>
            </footer>
        </div>
    );
};

export default RegionsPage;
