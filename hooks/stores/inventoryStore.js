import { create } from "zustand";

import { initialFoods, initialToys } from "@/lib/defaultInventory";

export const useInventoryStore = create((set) => ({
  foodInventory: initialFoods,
  toyInventory: initialToys,
  setAllfoodInvetory: (foodInventory) => {
    set((state) => ({
      foodInventory: foodInventory,
    }));
  },
  setAllToyInventory: (toyInventory) => {
    set((state) => ({
      toyInventory: toyInventory,
    }));
  },
  updateInventoryWithNewKeys: () => {
    set((state) => ({
      foodInventory: [
        ...state.foodInventory,
        ...initialFoods.filter(
          (food) => !state.foodInventory.some((item) => item.id === food.id)
        ),
      ],
      toyInventory: [
        ...state.toyInventory,
        ...initialToys.filter(
          (toy) => !state.toyInventory.some((item) => item.id === toy.id)
        ),
      ],
    }));
  },
  onUpdateFood: (value, newFoodId) => {
    set((state) => ({
      foodInventory: state.foodInventory.map((food) =>
        food.id === newFoodId ? { ...food, value: food.value + value } : food
      ),
    }));
  },
  onUpdateToy: (newToyId) => {
    set((state) => ({
      toyInventory: state.toyInventory.map((toy) =>
        toy.id === newToyId ? { ...toy, purchased: true } : toy
      ),
    }));
  },
  onResetInventory: () => {
    set(() => ({
      foodInventory: initialFoods,
      toyInventory: initialToys,
    }));
  },
}));
