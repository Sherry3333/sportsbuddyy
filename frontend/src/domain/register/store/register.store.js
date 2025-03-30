import { create } from "zustand";

export const useRegisterStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value })
}));
