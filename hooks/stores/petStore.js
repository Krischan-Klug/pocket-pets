import { create } from "zustand";
import { persist } from "zustand/middleware";
import initialMyPets from "@/lib/initialPet.js";
import defaultMyPet from "@/lib/myPetTemplate.js";
import {
  calculateLevel,
  percentageLevelProgress,
} from "@/components/util/calculateLevel";

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
            return {
              myPets: state.myPets.map((pet) =>
                pet.id === state.currentPet.id ? updatedPet : pet
              ),
              currentPet: updatedPet,
            };
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
            return {
              myPets: state.myPets.map((pet) =>
                pet.id === state.currentPet.id ? updatedPet : pet
              ),
              currentPet: updatedPet,
            };
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
            return {
              myPets: state.myPets.map((pet) =>
                pet.id === state.currentPet.id ? updatedPet : pet
              ),
              currentPet: updatedPet,
            };
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

      onUpdateActivePetValues: ({
        energy = 0,
        hunger = 0,
        happiness = 0,
        xp = 0,
      }) => {
        set((state) => {
          if (!state.currentPet.isDead) {
            const updatedHunger = Math.min(
              Math.max(state.currentPet.hunger + hunger, 0),
              100
            );
            const updatedEnergy = Math.min(
              Math.max(state.currentPet.energy + energy, 0),
              100
            );
            const updatedHappiness = Math.min(
              Math.max(state.currentPet.happiness + happiness, 0),
              100
            );
            const updatedXP = state.currentPet.xp + xp;

            const newHealth =
              (updatedHunger + updatedEnergy + updatedHappiness) / 3;

            const updatedPet = {
              ...state.currentPet,
              hunger: updatedHunger,
              energy: updatedEnergy,
              happiness: updatedHappiness,
              health: newHealth,
              xp: updatedXP,
              level: calculateLevel(updatedXP),
              isDead: newHealth > 10 ? false : true,
            };

            return {
              myPets: state.myPets.map((pet) =>
                pet.id === state.currentPet.id ? updatedPet : pet
              ),
              currentPet: updatedPet,
            };
          } else {
            return {
              myPets: state.myPets.map((pet) =>
                pet.id === state.currentPet.id ? state.currentPet : pet
              ),
              currentPet: state.currentPet,
            };
          }
        });
      },
    }),
    {
      name: "pets",
    }
  )
);
