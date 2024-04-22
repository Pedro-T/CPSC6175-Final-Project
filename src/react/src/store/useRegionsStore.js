import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

const useRegionsStore = create((set) => ({
    regions: [],
    selectedRegion: '',
    countries: [],
    loading: false,
    error: '',

    selectAndFetchCountriesByRegion: async (regionName) => {
        set({ loading: true, error: '', selectedRegion: regionName, countries: [] });
        try {
            const response = await axios.get(`${API_BASE_URL}/region/${regionName}`);
            set({ countries: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useRegionsStore;
