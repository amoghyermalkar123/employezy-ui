import { create } from "zustand";

interface StoreState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  userExpiryIn: number | null;
  setUserExpiryIn: (expiry: number) => void;

  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;

  userId: string;
  setUserId: (userId: string) => void;

  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  NewJobSideBarState: boolean;
  setNewJobSideBarState: (state: boolean) => void;

  jobViewState: boolean;
  setJobViewState: (state: boolean) => void;

  jobUserId: string;
  setJonUserId: (id: string) => void;
}

const zustandStore = create<StoreState>(set => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    // Set the loading state to true
    set({ isLoading: loading });
  },

  userExpiryIn: null,
  setUserExpiryIn: (expiry: number) => {
    set({ userExpiryIn: expiry });
  },

  pageIndex: 0,
  setPageIndex: (pageIndex: number) => {
    set({ pageIndex: pageIndex });
  },

  userId: "",
  setUserId: (userID: string) => {
    set({ userId: userID });
  },

  searchTerm: "",
  setSearchTerm: (searchTerm: string) => {
    set({ searchTerm: searchTerm });
  },
  NewJobSideBarState: false,
  setNewJobSideBarState: (state: boolean) => {
    set({ NewJobSideBarState: state });
  },

  jobViewState: false,
  setJobViewState: (state: boolean) => {
    set({ jobViewState: state });
  },

  jobUserId: "",
  setJonUserId: (id: string) => {
    set({ jobUserId: id });
  }
}));

export default zustandStore;
