import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMoneyStore = create(
  persist(
    (set, get) => ({
      money: 1000,
      addMoney: (amount) => set({ money: get().money + amount }),
      subtractMoney: (amount) => set({ money: get().money - amount }),
    }),
    {
      name: "money",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
