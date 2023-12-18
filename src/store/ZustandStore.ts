import { create } from "zustand";

interface StoreState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const zustandStore = create<StoreState>(set => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    // Set the loading state to true
    set({ isLoading: loading });
  }
}));

export default zustandStore;
