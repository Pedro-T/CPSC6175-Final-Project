import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIService from "../services/APIService";
import './CountryDetailPage.css';

const CountryDetailPage = () => {
    const { countryName } = useParams();
    const [countryDetails, setCountryDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        APIService.getCountrybyName(decodeURIComponent(countryName))
            .then(data => {
                setCountryDetails(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'An error occurred while fetching country details.');
                setLoading(false);
            });
    }, [countryName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!countryDetails) return <div>No country data available.</div>;

    return (
        <div className="country-detail-page">
            <h1>{countryDetails.name}</h1>
        </div>
    );
};

export default CountryDetailPage;
