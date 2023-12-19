import { create } from "zustand";

interface StoreState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  userExpiryIn: number | null;
  setUserExpiryIn: (expiry: number) => void;

  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;

}

const zustandStore = create<StoreState>(set => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    // Set the loading state to true
    set({ isLoading: loading });
  },

  userExpiryIn: null,
  setUserExpiryIn: (expiry: number) => {
    set({ userExpiryIn: expiry })
  },

  pageIndex:0,
  setPageIndex:(pageIndex: number) => {
    set({pageIndex: pageIndex})
  }
}));

export default zustandStore;
