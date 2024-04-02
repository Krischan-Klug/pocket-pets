import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StyledButton from "@/components/StyledComponents/StyledButton";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import {
  InputLabel,
  InputField,
  Label,
} from "@/components/StyledComponents/StyledInputField";

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
      <header>
        <StyledLeftButton onClick={() => router.push(`/pet-detail-page/${id}`)}>
          Back
        </StyledLeftButton>
        <h1>Edit your pet</h1>
      </header>
      <main>
        <StyledEditForm onSubmit={handleSubmit}>
          <Label className="input">
            <InputField
              className="inputField"
              id="name"
              name="name"
              defaultValue={name}
              minLength={1}
              maxLength={50}
              required
              placeholder=" "
            />
            <InputLabel className="inputLabel" htmlFor="name">
              Name:
            </InputLabel>
          </Label>

          <Image alt={type} src={image} width={150} height={150} />
          <StyledButton type="submit">Save</StyledButton>
        </StyledEditForm>
      </main>
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
