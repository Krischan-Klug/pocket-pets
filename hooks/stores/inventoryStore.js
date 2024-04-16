import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMoneyStore = create((set) => ({
  food: [],
  toys: [],
  addFood: (food) => set((state) => ({ food: [...state.food, food] })),
}));

/*
export const useMoneyStore = create(      
    persist(
      (set) => ({
        food: [],
        toys: [],
      }),
      {
        name: "inventory",
      }
    )
  );
  */
