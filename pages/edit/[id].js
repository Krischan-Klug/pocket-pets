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
import { clothes } from "@/lib/shop";
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
import ItemCard from "@/components/Inventory/ItemCard";

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 45vh;
`;

const StyledPetImage = styled(Image)`
  position: absolute;
  bottom: 50px;
  left: 50%; /* Position at the center of the screen */
  transform: translateX(-50%);
`;

const StyledClothesImage = styled(Image)`
  position: absolute;
  bottom: ${({ $yoffset }) => $yoffset}px;
  left: 20%; /* Adjust the horizontal position */
`;

export default function EditPet({ currentTime, currentSeason, isRaining }) {
  const myPets = usePetStore((state) => state.myPets);
  const onUpdatePet = usePetStore((state) => state.onUpdatePet);
  const clothesInventory = useInventoryStore((state) => state.clothesInventory);

  const [savePopUp, setSavePopUp] = useState(false);
  const [newCurrentPetData, setNewCurrentPetData] = useState(null);
  const [selectedClothesItemId, setSelectedClothesItemId] = useState(null);
  const [clothesImage, setClothesImage] = useState({
    src: "",
    alt: "",
    $yoffset: "",
  });

  const router = useRouter();
  const { id } = router.query;

  // functions to dress your pet
  const availableClothes = clothesInventory.filter((clothesitem) => {
    if (clothesitem.purchased === true) {
      return clothesitem;
    }
  });

  function findClothesValuesById(id) {
    const clothesitem = clothes.find((item) => item.id === id);
    return clothesitem;
  }

  function handleClickOnClothesItem(id) {
    setSelectedClothesItemId(id);
    const clothesitem = clothes.find((item) => item.id === id);
    // daraus alt & src ziehen // setUSESTATE für IMAGE
  }

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
              <ItemCard
                key={clothesitem.id}
                id={clothesitem.id}
                name={findClothesValuesById(clothesitem.id).name}
                image={findClothesValuesById(clothesitem.id).image}
                // isActive={clothesitem.id === selectedClothesItemId}
                onClickOnItem={handleClickOnClothesItem}
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
          <StyledButton type="submit">Save</StyledButton>
        </StyledEditForm>
        <StyledImageContainer>
          {/* {selectedClothesItemId !== null && ( */}
          {/* {availableClothes.map((clothesitem) => ( */}
          <StyledClothesImage
            $yoffset={findClothesValuesById(clothesitem.id).yOffset}
            alt={findClothesValuesById(clothesitem.id).name}
            src={findClothesValuesById(clothesitem.id).image}
            width={250}
            height={250}
          />
          {/* ))}
          ;)} */}
          <StyledPetImage alt={type} src={image} width={150} height={150} />
        </StyledImageContainer>
      </main>
      {savePopUp && (
        <ConfirmationPopup
          message={`Are you sure about your edits?`}
          onConfirm={handleConfirm}
          onCancel={() => setSavePopUp(false)}
        />
      )}
    </>
  );
}
