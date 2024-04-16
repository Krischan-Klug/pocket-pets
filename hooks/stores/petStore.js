import { create } from "zustand";
import { persist } from "zustand/middleware";
import initialMyPets from "@/lib/initialPet.js";
import defaultMyPet from "@/lib/myPetTemplate.js";

export const usePetStore = create(
  persist(
    (set) => ({
      myPets: initialMyPets,
      currentPet: null,
      onSetCurrentPet: (myPet) => set({ currentPet: myPet }),
      onAddPet: (newPet) => {
        set((state) => ({
          myPets: [...state.myPets, newPet],
        }));
      },
      onUpdatePet: (updatedPet) => {
        set((state) => ({
          myPets: state.myPets.map((myPet) =>
            myPet.id === updatedPet.id ? updatedPet : myPet
          ),
        }));
      },

      onUpdatePetEnergy: (energyToUpdate) =>
        set((state) => {
          if (!state.currentPet.isDead) {
            const updatedEnergy = state.currentPet.energy + energyToUpdate;
            const updatedPet = {
              ...state.currentPet,
              energy: Math.min(Math.max(updatedEnergy, 0), 100),
            };
            set({
              currentPet: updatedPet,
              myPets: state.myPets.map((myPet) =>
                myPet.id === updatedPet.id ? updatedPet : myPet
              ),
            });
          }
        }),

      onUpdatePetHappiness: (happinessToUpdate) =>
        set((state) => {
          if (!state.currentPet.isDead) {
            const updatedHappiness =
              state.currentPet.happiness + happinessToUpdate;
            const updatedPet = {
              ...state.currentPet,
              happiness: Math.min(Math.max(updatedHappiness, 0), 100),
            };
            set({
              currentPet: updatedPet,
              myPets: state.myPets.map((myPet) =>
                myPet.id === updatedPet.id ? updatedPet : myPet
              ),
            });
          }
        }),
      onUpdatePetHunger: (hungerToUpdate) =>
        set((state) => {
          if (!state.currentPet.isDead) {
            const updatedHunger = state.currentPet.hunger + hungerToUpdate;
            const updatedPet = {
              ...state.currentPet,
              hunger: Math.min(Math.max(updatedHunger, 0), 100),
            };
            set({
              currentPet: updatedPet,
              myPets: state.myPets.map((myPet) =>
                myPet.id === updatedPet.id ? updatedPet : myPet
              ),
            });
          }
        }),
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
    }
  )
);
