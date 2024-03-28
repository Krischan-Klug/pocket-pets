import { useRouter } from "next/router";
import Image from "next/image";
import editIcon from "/public/assets/icons/edit_round_outline_black.png";
import Link from "next/link";
import styled from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";
import { useEffect } from "react";
import { useState } from "react";

import hungerImg from "/public/assets/images/interaction/hunger.png";

import graveImage from "/public/assets/images/grave.png";

const StyledPetDetailPageHeader = styled.header`
  padding: 20px;
  width: 100%;
`;

const StyledEditButton = styled.button`
  position: left;
`;

const StyledPetDetailPageMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPetImage = styled(Image)`
  margin: 40px 0;
`;

const StyledPetDetailPageFooter = styled.footer`
  padding: 0 30px;
  width: 100%;
  position: sticky;
  bottom: 20;
  z-index: 10;
`;

export default function PetDetailPage({
  myPets,
  onGameUpdate,
  onSetIsDead,
  onUpdatePet,
}) {
  const [currentPet, setCurrentPet] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  //Gameloop for DEBUGING with 100ms later 10.000ms
  useEffect(() => {
    if (!id) return;

    const pet = myPets.find((myPet) => myPet.id == id);
    if (!pet) return;

    setCurrentPet(pet);

    if (pet.isDead) return;

    const interval = setInterval(() => {
      onGameUpdate(id);
    }, 1000);

    // Cleaning up the component unmount
    return () => clearInterval(interval);
  }, [id, myPets]);

  if (!id) {
    return (
      <>
        <h1>No valid id.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  if (!currentPet) {
    return (
      <>
        <h1>Pet not found.</h1>
        <Link href="/">Return to your pets collection.</Link>
      </>
    );
  }

  const { name, type, image, health, hunger, happiness, energy, isDead } =
    currentPet;
  if (health === 0 || hunger === 0 || happiness === 0 || energy === 0) {
    if (!isDead) {
      onSetIsDead(id);
    }
  }

  function handleFeed(foodToGive) {
    if (!currentPet.isDead) {
      const updatedHunger = currentPet.hunger + foodToGive;
      onUpdatePet({
        ...currentPet,
        hunger: updatedHunger > 100 ? 100 : updatedHunger,
      });
    }
    console.log(currentPet.hunger);
  }

  return (
    <>
      <StyledPetDetailPageHeader>
        <StyledEditButton onClick={() => router.push(`/edit/${id}`)}>
          <Image src={editIcon} alt="edit button" height={20} width={20} />
        </StyledEditButton>
      </StyledPetDetailPageHeader>
      <StyledPetDetailPageMain>
        <h1>{name}</h1>
        <StatusBar text={"Health"} value={currentPet.health} />
        <StatusBar text={"Hunger"} value={currentPet.hunger} />
        <StatusBar text={"Happiness"} value={currentPet.happiness} />
        <StatusBar text={"Energy"} value={currentPet.energy} />
        <button onClick={() => handleFeed(10)}>
          <Image alt="Hunger" src={hungerImg} width={50} height={50}></Image>
        </button>

        <StyledPetImage
          src={isDead ? graveImage : image}
          alt={type}
          height={150}
          width={150}
        />
      </StyledPetDetailPageMain>

      <StyledPetDetailPageFooter>
        <Link href="/">← Back to pets collection</Link>
      </StyledPetDetailPageFooter>
    </>
  );
}
