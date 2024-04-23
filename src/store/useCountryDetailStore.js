import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

const useCountryDetailStore = create((set) => ({
    countryDetails: null,
    loading: false,
    error: '',

    fetchCountryDetails: async (name) => {
        set({ loading: true, error: '' });
        try {
            const response = await axios.get(`${API_BASE_URL}/name/${encodeURIComponent(name)}`);
            set({ countryDetails: response.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'An error occurred while fetching country details.', loading: false });
        }
    }
}));

export default useCountryDetailStore;
