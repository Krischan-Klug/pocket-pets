import ConfirmationPopup from "@/components/util/ConfirmPopUp";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StyledButton from "@/components/StyledComponents/StyledButton";
import {
  InputLabel,
  InputField,
  Label,
} from "@/components/StyledComponents/StyledInputField";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { usePetStore } from "@/hooks/stores/petStore";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";
import StyledInventoryContainer from "@/components/StyledComponents/StyledInventoryContainer";
import InventoryContainer from "@/components/DetailPage/InventoryContainer";
import {
  StyledBackgroundImageWrapper,
  StyledTimeBackground,
  StyledWallBackground,
  StyledRainBackground,
  StyledDressingRoomBackground,
} from "@/components/StyledComponents/StyledBackgroundImage";

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function EditPet({
  currentTime,
  currentDay,
  currentSeason,
  isRaining,
}) {
  const myPets = usePetStore((state) => state.myPets);
  const onUpdatePet = usePetStore((state) => state.onUpdatePet);

  const [savePopUp, setSavePopUp] = useState(false);
  const [newCurrentPetData, setNewCurrentPetData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  // items to dress your pet
  const clothesInventory = useInventoryStore((state) => state.clothesInventory);
  const availableClothes = clothesInventory.filter((clothesitem) => {
    if (clothesitem.purchased === true) {
      return clothesitem;
    }
  });

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
      <StyledTimeBackground
        currenttime={currentTime}
        currentseason={currentSeason}
      />
      {isRaining && (
        <StyledRainBackground
          iswinter={currentSeason === 3 ? "true" : "false"}
          currentseason={currentSeason}
        />
      )}
      <StyledDressingRoomBackground />
      <header>
        <StyledLink href={`/pet-detail-page/${id}`}>Back</StyledLink>
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
              maxLength={15}
              required
              placeholder=" "
            />
            <InputLabel className="inputLabel" htmlFor="name">
              Name
            </InputLabel>
          </Label>

          <StyledInventoryContainer>
            {availableClothes.map((clothesitem) => (
              <InventoryContainer
                key={clothesitem.id}
                id={clothesitem.id}
                name={findClothesValuesById(clothesitem.id).name}
                value={findClothesValuesById(clothesitem.id).value}
                image={findClothesValuesById(clothesitem.id).image}
                isActive={clothesitem.id === selectedClothesItemId}
                onClickOnItem={handleClickOnToyItem}
                // type="Happiness"
              />
            ))}
            {availableClothes.length === 0 && (
              <>
                <p>
                  You need to purchase items in the shop first before you can
                  dress your pet.
                </p>
                <Link href={`/${id}/shop/`}>To Shop</Link>
              </>
            )}
          </StyledInventoryContainer>

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
