import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import initialMyPets from "@/lib/initialPet.js";
import defaultMyPet from "@/lib/myPetTemplate.js";

export const usePetStore = create(
  persist(
    (set, get) => ({
      myPets: initialMyPets,
      currentPet: null,
      onSetCurrentPet: (myPet) => set({ currentPet: myPet }),
      onAddPet: (newPet) => {
        set((state) => ({
          myPets: [...state.myPets, newPet],
        }));
      },
      onUpdatePet: (updatedPet) => {
        set({
          myPets: get().myPets.map((myPet) =>
            myPet.id === updatedPet.id ? updatedPet : myPet
          ),
        });
      },

      onUpdatePetEnergy: (energyToUpdate) => {
        if (!get().currentPet.isDead) {
          const updatedEnergy = get().currentPet.energy + energyToUpdate;
          set((state) => ({
            currentPet: {
              ...state.currentPet,
              energy: Math.min(Math.max(updatedEnergy, 0), 100),
            },
          }));
        }
      },

      onUpdatePetHappiness: (HappinessToUpdate) => {
        if (!get().currentPet.isDead) {
          const updatedHappiness =
            get().currentPet.happiness + HappinessToUpdate;
          set((state) => ({
            currentPet: {
              ...state.currentPet,
              happiness: Math.min(Math.max(updatedHappiness, 0), 100),
            },
          }));
        }
      },
      onUpdatePetHunger: (HungerToUpdate) => {
        if (!get().currentPet.isDead) {
          const updatedHunger = get().currentPet.hunger + HungerToUpdate;
          set((state) => ({
            currentPet: {
              ...state.currentPet,
              hunger: Math.min(Math.max(updatedHunger, 0), 100),
            },
          }));
        }
      },
      onDeletePet: (id) => {
        set((state) => ({
          myPets: state.myPets.filter((myPet) => myPet.id !== id),
        }));
      },
      updatePetsWithNewKeys: () => {
        set((state) => ({
          myPets: state.myPets.map((myPet) => {
            const updatedPet = { ...defaultMyPet, ...myPet };
            return updatedPet;
          }),
        }));
      },
      setMyPets: (myPets) => {
        set({ myPets });
      },
    }),
    {
      name: "pets",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
