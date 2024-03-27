import GlobalStyle from "../styles";
import { useState } from "react";

const initialMyPets = [
  {
    id: "7da41d54-8213-424d-8484-5f77e1cfe491",
    type: "beaver",
    name: "Hans",
    image: "/assets/images/pets/beaver.png",
    health: 100,
    hunger: 100,
    happiness: 100,
    energy: 100,
    isDead: false,
  },
  {
    id: "2",
    type: "beaver",
    name: "Bello",
    image: "/assets/images/pets/crab.png",
    health: 100,
    hunger: 100,
    happiness: 100,
    energy: 100,
    isDead: false,
  },
  {
    id: "3",
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
    health: 100,
    hunger: 100,
    happiness: 100,
    energy: 100,
    isDead: false,
  },
  {
    id: "4",
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
    health: 100,
    hunger: 100,
    happiness: 100,
    energy: 100,
    isDead: true,
  },
  {
    id: "5",
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
    health: 100,
    hunger: 100,
    happiness: 100,
    energy: 100,
    isDead: false,
  },
];

export default function App({ Component, pageProps }) {
  const [myPets, setMyPets] = useState(initialMyPets);

  function handleAddPet(newPet) {
    setMyPets([...myPets, newPet]);
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
        onDeletePet={handleDeletePet}
        onGameUpdate={handleGameUpdate}
        onSetIsDead={handleSetIsDead}
      />
    </>
  );
}
