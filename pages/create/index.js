import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Image from "next/image";
import pets from "@/lib/pet";
import styled from "styled-components";
import StyledButton from "@/components/StyledComponents/StyledButton";
import StyledLeftButton from "@/components/StyledComponents/StyledLeftButton";
import {
  InputLabel,
  InputField,
  Label,
} from "@/components/StyledComponents/StyledInputField";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Create({ onAddPet }) {
  const router = useRouter();
  const [petData, setPetData] = useState({
    name: "",
    type: "owl",
    image: "/assets/images/pets/book.png",
  });
  const [petType, stePetType] = useState(0);

  const [imagePath, setImagePath] = useState(petData.image);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    const imagePath = `/assets/images/pets/${selectedType}.png`;
    setPetData({ ...petData, type: selectedType, image: imagePath });
    setImagePath(imagePath); // filled with local one!
  };

  function combinePetData() {
    const newPetData = {
      ...petData,
      id: uuidv4(),
      health: 100,
      hunger: 100,
      happiness: 100,
      energy: 100,
      isDead: false,
    };
    return newPetData;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPet(combinePetData());
    router.push("/");
  };

  function handleNextPetType() {
    stePetType((prevPetType) =>
      prevPetType + 1 >= pets.length ? 0 : prevPetType + 1
    );
  }

  return (
    <>
      <header>
        <StyledLeftButton onClick={() => router.push("/")}>
          Back
        </StyledLeftButton>
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
              value={petData.name}
              onChange={(event) =>
                setPetData({ ...petData, name: event.target.value })
              }
              minLength={1}
              maxLength={50}
              required
            />
            <InputLabel className="inputLabel" htmlFor="name">
              Name
            </InputLabel>
          </Label>
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={petData.type}
            onChange={handleTypeChange}
            required
          >
            <option value="" disabled>
              Please select a pet type
            </option>
            {pets.map((pet) => (
              <option key={pet.type} value={pet.type}>
                {pet.type}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            name="image"
            id="image"
            value={petData.image}
            readOnly
          />
          <br />
          <button type="button">Privous</button>
          <Image
            alt={petData.type}
            src={`/assets/images/pets/${pets[petType].type}.png`}
            width={100}
            height={100}
          />
          <button type="button" onClick={handleNextPetType}>
            Next
          </button>
          <br />
          <StyledButton type="submit">Create Pet</StyledButton>
        </StyledForm>
      </main>
    </>
  );
}
