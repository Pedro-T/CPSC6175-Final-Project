import create from 'zustand';
import axios from 'axios';

const useCountryDetailStore = create((set) => ({
    countryDetails: null,
    loading: false,
    error: '',

    fetchCountryDetails: async (name) => {
        set({ loading: true, error: '' });
        try {
            // Updated to use your backend endpoint
            const response = await axios.get(`http://localhost:8080/country/details/${encodeURIComponent(name)}`);
            set({ countryDetails: response.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'An error occurred while fetching country details.', loading: false });
        }
    }
}));

export default useCountryDetailStore;

