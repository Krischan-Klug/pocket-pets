import PetCard from "@/components/PetCollection/PetCard";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import StyledButton from "@/components/StyledComponents/StyledButton";

const StyledPetCollectionHeader = styled.header`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledButtonWrapper = styled.section`
  display: flex;
  gap: 10px;
`;

const StyledPetCollection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0px;
  width: 350px;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export default function HomePage({ myPets, onDeletePet }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const router = useRouter();

  function handleToggleDelete() {
    setDeleteMode((prevDeleteMode) => !prevDeleteMode);
  }

  function handleClickOnPetCard(id) {
    if (deleteMode) {
      setSelectedPetId(id);
    } else {
      router.push(`/pet-detail-page/${id}`);
    }
  }

  function handleConfirmDelete() {
    onDeletePet(selectedPetId);
    handleToggleDelete();
    setSelectedPetId(null);
  }

  return (
    <>
      <StyledPetCollectionHeader>
        <h1>My Pets</h1>
        <StyledButtonWrapper>
          <StyledButton
            onClick={() => {
              router.push(`/create/`);
            }}
          >
            Create Pet
          </StyledButton>

          <StyledButton
            onClick={() => {
              handleToggleDelete();
            }}
          >
            Delete Pet
          </StyledButton>
        </StyledButtonWrapper>
      </StyledPetCollectionHeader>
      <main>
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
      </main>
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
