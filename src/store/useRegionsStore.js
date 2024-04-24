import create from 'zustand';
import axios from 'axios';

const useRegionsStore = create((set) => ({
    regions: [],
    selectedRegion: '',
    countries: [],
    loading: false,
    error: '',

    selectAndFetchCountriesByRegion: async (regionName) => {
        set({ loading: true, error: '', selectedRegion: regionName, countries: [] });
        try {
            const response = await axios.get(`http://localhost:8080/countrylist/region/${regionName}`);
            set({ countries: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useRegionsStore;

