import create from 'zustand';

const useApiStore = create((set) => ({
    data: null,
    error: null,
    fetchApiData: async () => {
        try {
            const response = await fetch('spring-boot-api-endpoint'); //Replace with spring-boot-api-endpoint
            const data = await response.json();
            set({ data });
        } catch (error) {
            set({ error: error.message });
        }
    },
}));

export default useApiStore;
