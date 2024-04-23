import { create } from "zustand";

export const useMoneyStore = create((set) => ({
  money: 1000,
  setAllMoney: (amount) => set({ money: amount }),
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  subtractMoney: (amount) => set((state) => ({ money: state.money - amount })),
  onResetMoney: () => set({ money: 1000 }),
}));
