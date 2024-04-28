import create from 'zustand';

const useCountryStore = create((set) => ({
    countryDetails: null,
    loading: false,
    error: null,

    fetchCountryDetails: async (countryName) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8080/countrylist/name/${encodeURIComponent(countryName)}`);
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
