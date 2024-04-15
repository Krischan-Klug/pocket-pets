import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMoneyStore = create(
  persist(
    (set) => ({
      money: 1000,
      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      subtractMoney: (amount) =>
        set((state) => ({ money: state.money - amount })),
    }),
    {
      name: "money",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
