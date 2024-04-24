import create from 'zustand';
import axios from 'axios';

const useDemographicsStore = create((set) => ({
    countriesByLanguage: [],
    countriesByCurrency: [],
    loading: false,
    error: '',

    fetchCountriesByLanguage: async (languageName) => {
        set({ loading: true, error: '', countriesByCurrency: [] });
        try {
            const response = await axios.get(`http://localhost:8080/countrylist/language/${languageName}`);
            set({ countriesByLanguage: response.data, loading: false });
        } catch (error) {
            set({ error: 'Error fetching countries by language', loading: false });
        }
    },

    fetchCountriesByCurrency: async (currencyName) => {
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


