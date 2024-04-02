import GlobalStyle from "../styles";
import { useState } from "react";
import initialMyPets from "@/lib/initialPet";
import AudioInterface from "@/components/AudioPlayer/AudioInterface.js";

export default function App({ Component, pageProps }) {
  const [myPets, setMyPets] = useState(initialMyPets);

  function handleAddPet(newPet) {
    setMyPets([...myPets, newPet]);
  }

  function handleUpdatePet(updatedPet) {
    setMyPets(
      myPets.map((myPet) => (myPet.id === updatedPet.id ? updatedPet : myPet))
    );
  }

  function handleDeletePet(id) {
    setMyPets(myPets.filter((myPet) => myPet.id !== id));
  }

  function handleGameUpdate(updateId) {
    setMyPets(
      myPets.map((pet) =>
        pet.id === updateId
          ? {
              ...pet,
              health: Math.max(pet.health - 0.4, 0),
              hunger: Math.max(pet.hunger - 1, 0),
              happiness: Math.max(pet.happiness - 0.75, 0),
              energy: Math.max(pet.energy - 0.5, 0),
            }
          : pet
      )
    );
  }

  function handleSetIsDead(updateId) {
    setMyPets(
      myPets.map((pet) =>
        pet.id === updateId
          ? {
              ...pet,
              isDead: true,
            }
          : pet
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        myPets={myPets}
        onAddPet={handleAddPet}
        onUpdatePet={handleUpdatePet}
        onDeletePet={handleDeletePet}
        onGameUpdate={handleGameUpdate}
        onSetIsDead={handleSetIsDead}
      />
      <AudioInterface />
    </>
  );
}
