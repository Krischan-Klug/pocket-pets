import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const StyledUpdatePetHeader = styled.header`
  padding: 20px;
  width: 100%;
`;

const StyledBackToDetailPageButton = styled.button`
  position: left;
`;

const StyledUpdatePetMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function EditPet({ myPets, onUpdatePet }) {
  const [savePopUp, setSavePopUp] = useState(false);
  const [newCurrentPetData, setNewCurrentPetData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <>
        <h1>No valid id.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  const currentPet = myPets.find((myPet) => myPet.id == id);

  if (!currentPet) {
    return (
      <>
        <h1>Pet not found.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  const { name, type, image } = currentPet;

  function handleSubmit(event) {
    event.preventDefault();
    const newPetName = event.target.name.value;

    setNewCurrentPetData({
      ...currentPet,

      name: newPetName,
    });

    setSavePopUp(true);
  }

  function handleConfirm() {
    onUpdatePet(newCurrentPetData);
    router.push(`/pet-detail-page/${id}`);
  }

  return (
    <>
      <StyledUpdatePetHeader>
        <StyledBackToDetailPageButton
          onClick={() => router.push(`/pet-detail-page/${id}`)}
        >
          Back
        </StyledBackToDetailPageButton>
      </StyledUpdatePetHeader>
      <StyledUpdatePetMain>
        <h1>Edit your pet</h1>
        <StyledEditForm onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            defaultValue={name}
            minLength={1}
            maxLength={50}
            required
          />
          <Image alt={type} src={image} width={150} height={150} />
          <button type="submit">Save</button>
        </StyledEditForm>
      </StyledUpdatePetMain>
      {savePopUp && (
        <ConfirmationPopup
          message={`Are you sure you want to change the name of your pet to ${newCurrentPetData.name}?`}
          onConfirm={handleConfirm}
          onCancel={() => setSavePopUp(false)}
        />
      )}
    </>
  );
}
