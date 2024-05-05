import React, { useState } from 'react';
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import useRegionsStore from '../../store/useRegionsStore';
import './RegionsPage.css';
import './common/CommonPageElements.css';

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
        <div className="page">
            <Navbar />
            <div className="title-container">
                <h1 className="page-title">Regions</h1>
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

            <div className="country-data">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && countries.length > 0 ? (
                    <ul>
                        {countries.map((country, index) => (
                            <li key={index}
                                onMouseEnter={(e) => handleMouseEnter(country, e)}
                                onMouseLeave={handleMouseLeave}>
                                {country.nameCommon}
                                {hoveredCountry === country && (
                                    <div className="country-tooltip" style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}>
                                        <p>{'Name: ' + country.nameCommon}</p>
                                        <p>{'Official Name: ' + country.nameOfficial}</p>
                                        <p>{'Country Code: ' + country.cca2}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Select a region or subregion to view countries</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default RegionsPage;
