import { create } from "zustand";
import initialMyPets from "@/lib/initialPet.js";
import defaultMyPet from "@/lib/myPetTemplate.js";
import { calculateLevel } from "@/components/util/calculateLevel";

export const usePetStore = create((set) => ({
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
}));
