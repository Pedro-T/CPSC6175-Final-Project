import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

class APIService {
    // Fetch all countries
    getAllCountries() {
        return axios.get(`${API_BASE_URL}/all`);
    }

    // Fetch country by name
    getCountrybyName(nameCommon) {
        return axios.get(`${API_BASE_URL}/name/${nameCommon}`);
    }

    // Fetch country by code (cca2)
    getCountryByCode(cca2) {
        return axios.get(`${API_BASE_URL}/country/${cca2}`);
    }

    // Fetch countries by region
    getCountriesByRegion(regionName) {
        return axios.get(`${API_BASE_URL}/region/${regionName}`);
    }

    // Fetch countries by subregion
    getCountriesBySubRegion(subregionName) {
        return axios.get(`${API_BASE_URL}/region/${subregionName}`);
    }

    // Fetch countries by currency
    getCountriesByCurrency(currencyName) {
        return axios.get(`${API_BASE_URL}currency/${currencyName}`);
    }

    // Fetch countries by language
    getCountriesByLanguage(languageName) {
        return axios.get(`${API_BASE_URL}language/${languageName}`);
    }
}

// Create an instance of the API service and export it
export default new APIService();