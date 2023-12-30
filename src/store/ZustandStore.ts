/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { UserSession } from "../models/User";

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

  appliedJobs: any[];
  loadAppliedJobs: (appliedJobs: any[]) => void;

  userDetails: UserSession | null;
  setUserDetails: (userDetails: UserSession) => void;
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

  pageIndex: 2,
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

  appliedJobs: [],
  loadAppliedJobs: (appliedJobs: any[]) => {
    set({ appliedJobs: appliedJobs });
  },

  userDetails: null,
  setUserDetails: (userDetails: UserSession) => {
    set({ userDetails: userDetails});
  },
}));

export default zustandStore;
