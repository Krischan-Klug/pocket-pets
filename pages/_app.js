import GlobalStyle from "../styles";
import { useState } from "react";

const initialMyPets = [
  {
    id: 1,
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
  },
  {
    id: 2,
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
  },
  {
    id: 3,
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
  },
  {
    id: 4,
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
  },
  {
    id: 5,
    type: "beaver",
    name: "Timmy",
    image: "/assets/images/pets/beaver.png",
  },
];

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

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        myPets={myPets}
        onAddPet={handleAddPet}
        onUpdatePet={handleUpdatePet}
        onDeletePet={handleDeletePet}
      />
    </>
  );
}
