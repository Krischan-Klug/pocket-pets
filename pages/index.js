import PetCard from "@/components/PetCollection/PetCard";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const StyledPetCollectionHeader = styled.header`
  padding: 0px 30px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledPetCollectionWrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const StyledPetCollection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0px;
  width: 350px;
`;

export default function HomePage({ myPets, onDeletePet }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const router = useRouter();

  function handleToggleDelete() {
    setDeleteMode((prevDeleteMode) => !prevDeleteMode);
  }

  function handleClickOnPetCard(id) {
    console.log("id: ", id);
    if (deleteMode) {
      setSelectedPetId(id);
    } else {
      //router.push(`/details/${id}`);
    }
  }

  function handleConfirmDelete() {
    console.log("DELETE");
    onDeletePet(selectedPetId);
    handleToggleDelete();
    setSelectedPetId(null);
  }

  return (
    <>
      <StyledPetCollectionHeader>
        <h1>My Pets</h1>
        <button
          onClick={() => {
            handleToggleDelete();
          }}
        >
          Delete Pet
        </button>
      </StyledPetCollectionHeader>
      <StyledPetCollectionWrapper>
        <StyledPetCollection>
          {myPets.map((myPet) => (
            <PetCard
              key={myPet.id}
              myPet={myPet}
              deleteMode={deleteMode}
              handleClickOnPetCard={handleClickOnPetCard}
            />
          ))}
        </StyledPetCollection>
      </StyledPetCollectionWrapper>
      {deleteMode && selectedPetId && (
        <ConfirmationPopup
          message={`Are you sure you want to delete the pet ${
            myPets.find((pet) => pet.id === selectedPetId).name
          }?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setSelectedPetId(null)}
        />
      )}
    </>
  );
}
