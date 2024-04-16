import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialFoods } from "@/lib/defaultInventory";

export const useMoneyStore = create((set) => ({
  foods: [],
  toys: [],
  onFood: (value, newFoodId) => {
    set((state) => ({
      foods: state.foods.map((food) =>
        food.id === newFoodId ? food.quantity + value : food
      ),
    }));
  },
}));

/*

function handleUpdateInventoryFood(value, newFoodId) {
    setUserStats((prevStats) => {
      const updatedInventory = { ...prevStats.inventory };
      const foodIndex = updatedInventory.food.findIndex(
        (item) => item.id === newFoodId
      );
      if (foodIndex !== -1) {
        updatedInventory.food[foodIndex].value =
          updatedInventory.food[foodIndex].value + value;
      }
      return { ...prevStats, inventory: updatedInventory };
    });
  }

  onUpdatePet: (updatedPet) => {
        set((state) => ({
          myPets: state.myPets.map((myPet) =>
            myPet.id === updatedPet.id ? updatedPet : myPet
          ),
        }));
      },



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
