import create from 'zustand';

const useCountryListStore = create((set) => ({
    countryList: [],
    fetchCountryList: async () => {
        try {
            const response = await fetch('http://localhost:8080/countrylist/all');
            const data = await response.json();
            set({ countryList: data });
        } catch (error) {
            console.error("Failed to fetch country list:", error);
        }
    }
}));

export default useCountryListStore;