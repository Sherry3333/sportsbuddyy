// src/domain/register/store/register.store.ts
import { create } from "zustand";

interface RegisterState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value })
}));
