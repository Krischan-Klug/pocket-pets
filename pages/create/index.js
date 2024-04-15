import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Image from "next/image";
import pets from "@/lib/pet";
import styled from "styled-components";
import StyledButton from "@/components/StyledComponents/StyledButton";
import {
  InputLabel,
  InputField,
  Label,
} from "@/components/StyledComponents/StyledInputField";
import defaultMyPet from "@/lib/myPetTemplate";

import arrowLeft from "/public/assets/icons/round_arrow_back_ios_black.png";
import arrowRight from "/public/assets/icons/round_arrow_forward_ios_black.png";
import StyledLink from "@/components/StyledComponents/StyledLink";
import { usePetStore } from "@/components/stores/petStore";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PetSelectionSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const SytledTypeChangeButton = styled(Image)`
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.3);
    transition: 0.5s;
  }
`;

export default function Create({}) {
  const onAddPet = usePetStore((state) => state.onAddPet);
  const router = useRouter();
  const [petType, setPetType] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPet({
      ...defaultMyPet,
      id: uuidv4(),
      name: event.target.name.value,
      image: `/assets/images/pets/${pets[petType].type}.png`,
      type: pets[petType].type,
    });
    router.push("/");
  };

  function handleNextPetType() {
    setPetType((prevPetType) =>
      prevPetType + 1 >= pets.length ? 0 : prevPetType + 1
    );
  }
  function handlePreviousPetType() {
    setPetType((prevPetType) =>
      prevPetType - 1 < 0 ? pets.length - 1 : prevPetType - 1
    );
  }

  return (
    <>
      <header>
        <StyledLink href={"/"}>Back</StyledLink>
        <h1>Add a New Pet</h1>
      </header>
      <main>
        <StyledForm onSubmit={handleSubmit}>
          <Label className="input">
            <InputField
              className="inputField"
              placeholder=" "
              type="text"
              name="name"
              id="name"
              minLength={1}
              maxLength={15}
              required
            />
            <InputLabel className="inputLabel" htmlFor="name">
              Name
            </InputLabel>
          </Label>

          <br />
          <PetSelectionSection>
            <SytledTypeChangeButton
              onClick={handlePreviousPetType}
              src={arrowLeft}
              alt="Privous Pet Button"
              width={50}
              height={50}
            />
            <Image
              alt={`${pets[petType].type}`}
              src={`/assets/images/pets/${pets[petType].type}.png`}
              width={180}
              height={180}
            />
            <SytledTypeChangeButton
              onClick={handleNextPetType}
              src={arrowRight}
              alt="Privous Pet Button"
              width={50}
              height={50}
            />
          </PetSelectionSection>
          <br />
          <StyledButton type="submit">Create Pet</StyledButton>
        </StyledForm>
      </main>
    </>
  );
}
