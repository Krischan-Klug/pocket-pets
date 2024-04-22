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
  StyledTimeBackground,
  StyledRainBackground,
  StyledDressingRoomBackground,
} from "@/components/StyledComponents/StyledBackgroundImage";

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
`;

const StyledEditButton = styled(StyledButton)`
  margin-bottom: 20px;
  justify-content: center;
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const StyledPetImage = styled(Image)`
  position: absolute;
  bottom: 50px;
  left: 50%; /* Position at the center of the screen */
  transform: translateX(-50%);
`;

const StyledDiv = styled.div`
  height: 250px;
  width: 250px;
  position: absolute;
  bottom: ${({ $yoffset }) => $yoffset}px;
  left: 25px; /* Adjust the horizontal position */
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
    yoffset: 0,
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
    console.log("CLOTHESITEM: ", clothesitem);

    setClothesImage({
      alt: clothesitem.name,
      src: clothesitem.image,
      yoffset: clothesitem.yOffset,
    });
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
              <InventoryContainer
                key={clothesitem.id}
                id={clothesitem.id}
                name={findClothesValuesById(clothesitem.id).name}
                image={findClothesValuesById(clothesitem.id).image}
                isActive={clothesitem.id === selectedClothesItemId}
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
          <StyledEditButton type="submit">Save</StyledEditButton>
        </StyledEditForm>
        <StyledImageContainer>
          {selectedClothesItemId !== null && (
            <StyledDiv $yoffset={clothesImage.yoffset}>
              <Image
                alt={clothesImage.alt}
                src={clothesImage.src}
                width={250}
                height={250}
              />
            </StyledDiv>
          )}
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
