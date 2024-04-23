import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMoneyStore = create(
  persist(
    (set) => ({
      money: 1000,
      setAllMoney: (amount) => set({ money: amount }),
      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      subtractMoney: (amount) =>
        set((state) => ({ money: state.money - amount })),
      onResetMoney: () => set({ money: 1000 }),
    }),
    {
      name: "money",
    }
  )
);
