import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCountryDetailStore from '../../../store/useCountryDetailStore';
import './CountryDetailPage.css';

const CountryDetailPage = () => {
    const { countryName } = useParams();
    const { countryDetails, error, loading, fetchCountryDetails } = useCountryDetailStore();

    useEffect(() => {
        fetchCountryDetails(decodeURIComponent(countryName));
    }, [countryName, fetchCountryDetails]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!countryDetails) return <div>No country data available.</div>;

    return (
        <div className="country-detail-page">
            <h1>{countryDetails.name.common}</h1>
        </div>
    );
};

export default CountryDetailPage;
