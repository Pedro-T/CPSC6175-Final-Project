import create from 'zustand';
import axios from 'axios';

const useDemographicsStore = create((set) => ({
    countriesByLanguage: [],
    countriesByCurrency: [],
    loading: false,
    error: '',

    fetchCountriesByLanguage: async (language) => {
        set({ loading: true, error: '', countriesByCurrency: [] });
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/lang/${language}`);
            set({ countriesByLanguage: response.data, loading: false });
        } catch (error) {
            set({ error: 'Error fetching countries by language', loading: false });
        }
    },

    fetchCountriesByCurrency: async (currency) => {
        set({ loading: true, error: '', countriesByLanguage: [] }); // Reset countries by language
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/currency/${currency}`);
            set({ countriesByCurrency: response.data, loading: false });
        } catch (error) {
            set({ error: 'Error fetching countries by currency', loading: false });
        }
    },
}));

export default useDemographicsStore;

