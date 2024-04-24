import { create } from "zustand";

import {
  initialClothes,
  initialFoods,
  initialToys,
} from "@/lib/defaultInventory";

export const useInventoryStore = create((set) => ({
  foodInventory: initialFoods,
  toyInventory: initialToys,
  clothesInventory: initialClothes,

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
      clothesInventory: [
            ...state.clothesInventory,
            ...initialClothes.filter(
              (clothes) =>
                !state.clothesInventory.some((item) => item.id === clothes.id)
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
  
  onUpdateClothes: (newClothesId) => {
        set((state) => ({
          clothesInventory: state.clothesInventory.map((clothes) =>
            clothes.id === newClothesId
              ? { ...clothes, purchased: true }
              : clothes
          ),
        }));
      },
  
  onResetInventory: () => {
    set(() => ({
      foodInventory: initialFoods,
      toyInventory: initialToys,
      clothesInventory: initialClothes,
    }));
  },
   
    })
  )
);
