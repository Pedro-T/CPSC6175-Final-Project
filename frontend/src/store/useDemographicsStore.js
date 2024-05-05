import {create} from 'zustand';
import axios from 'axios';

const useDemographicsStore = create((set) => ({
    countriesByLanguage: [],
    countriesByCurrency: [],
    loading: false,
    error: '',

    fetchCountriesByLanguage: async (language) => {
        console.log("Fetching countries for language:", language);
        set({ loading: true, error: '', countriesByCurrency: [] });
        try {
            const response = await axios.get(`http://localhost:8080/countrylist/language/${language}`);
            set({ countriesByLanguage: response.data, loading: false });
        } catch (error) {
            set({ error: 'Error fetching countries by language', loading: false });
        }
    },

    fetchCountriesByCurrency: async (currencyName) => {
        console.log("Fetching countries for currency:", currencyName);
        set({ loading: true, error: '', countriesByLanguage: [] });
        try {
            const response = await axios.get(`http://localhost:8080/countrylist/currency/${currencyName}`);
            set({ countriesByCurrency: response.data, loading: false });
        } catch (error) {
            set({ error: 'Error fetching countries by currency', loading: false });
        }
    },
}));

export default useDemographicsStore;


