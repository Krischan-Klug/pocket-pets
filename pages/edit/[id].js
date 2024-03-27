// import InputField from "@/components/util/InputField";
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

// const StyledSaveButton = styled.button``;
// const StyledCancelButton = styled.button``;

export default function EditPet({ myPets }) {
  const [savePopUp, setSavePopUp] = useState(false);
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

  const [newPetData, setNewPetData] = useState({
    name: { name },
    type: { type },
    image: { image },
    // was ist mit den statusBar werten? health / hunger / happiness / energy?
  });

  function handleEditPet(newPetName) {
    setNewPetData({ ...newPetData, name: newPetName });
    //setNewPetData({ id, name: newPetName, type, image });
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
        <form>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            defaultValue={name}
            minLength={1}
            maxLength={50}
            required
          />
        </form>
        <Image alt={type} src={image} width={150} height={150} />
        <button type="submit" onClick={() => setSavePopUp(true)}>
          Save
        </button>
        {/* <button onClick={() => router.push(`/pet-detail-page/${id}`)}>
          Cancel
        </button> */}
      </StyledUpdatePetMain>
      {savePopUp && (
        <ConfirmationPopup
          message={"Are you sure you want to change the name of your pet?"}
          onConfirm={handleEditPet}
          onCancel={() => setSavePopUp(false)}
        />
      )}
    </>
  );
}
