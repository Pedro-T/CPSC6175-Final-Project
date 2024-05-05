import { create } from 'zustand';

const useCountryStore = create((set) => ({
    countryDetails: null,
    loading: false,
    error: null,

    fetchCountryDetails: async (identifier) => {
        set({ loading: true, error: null });
        try {
            const urlPath = identifier.length === 2
                ? `cca2/${encodeURIComponent(identifier.toUpperCase())}`
                : `name/${encodeURIComponent(identifier)}`;
            const response = await fetch(`/country/${urlPath}`);
            if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
            const data = await response.json();
            set({ countryDetails: data, loading: false });
        } catch (error) {
            set({ countryDetails: null, loading: false, error: error.message });
        }
    }
}));

export default useCountryStore;
