import PetCard from "@/components/PetCollection/PetCard";
import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import StyledButton from "@/components/StyledComponents/StyledButton";

import MoneyImage from "@/components/util/MoneyImage";
import {
  StyledBackgroundImageWrapper,
  StyledStaticBackground,
} from "@/components/StyledComponents/StyledBackgroundImage";

const StyledPetCollectionHeader = styled.header`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const StyledButtonWrapper = styled.section`
  display: flex;
  gap: 10px;
`;

const StyledPetCollection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  padding: 20px 0px;
  width: 95vw;
  height: calc(100vh - 120px);
  overflow-y: auto;
  z-index: 10;
  @media (min-width: 400px) {
    max-width: 700px;
    padding: 20px;
  }
`;

const MoneyCounter = styled.p`
  position: absolute;
  bottom: -10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default function HomePage({ myPets, onDeletePet, userStats }) {
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
      <StyledStaticBackground />
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
        <MoneyCounter>
          <MoneyImage />
          {userStats.money}
        </MoneyCounter>
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
