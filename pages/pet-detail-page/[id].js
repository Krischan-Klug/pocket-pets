import { useRouter } from "next/router";
import Image from "next/image";
import editIcon from "/public/assets/icons/edit_round_outline_black.png";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";
import { useEffect } from "react";
import { useState } from "react";

import hungerImage from "/public/assets/images/interaction/hunger.png";
import happinessImage from "/public/assets/images/interaction/happiness.png";
import energyImage from "/public/assets/images/interaction/energy.png";
import sleepingImage from "/public/assets/images/interaction/sleeping.png";
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

const StyledPetContainer = styled.section`
  position: relative;
`;

const StyledPetImage = styled(Image)`
  margin: 40px 0;
`;

const moveUpDown = keyframes`
0% {transform: translateY(0);}
50% {transform: translateY(-10px);}
100% {transform: translateY(0);}`;

const StyledInteractionImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 20%;
  animation: ${moveUpDown} 1s ease-in-out infinite;
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
  const [isSleep, setIsSleep] = useState(0);

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
      if (isSleep > 0) {
        onGameUpdate(id, true);
        setIsSleep((prevIsSleep) => (prevIsSleep -= 1));
      } else {
        onGameUpdate(id, false);
      }
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

  function handlePlay(toyToGive) {
    if (!currentPet.isDead) {
      const updatedHappiness = currentPet.happiness + toyToGive;
      onUpdatePet({
        ...currentPet,
        happiness: updatedHappiness > 100 ? 100 : updatedHappiness,
      });
    }
    console.log(currentPet.happiness);
  }

  function handleSleep() {
    if (!currentPet.isDead) {
      setIsSleep(10);
    }
    console.log(currentPet.energy);
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

        <button onClick={() => handleFeed(10)} disabled={isSleep > 0}>
          <Image alt="Hunger" src={hungerImage} width={50} height={50}></Image>
        </button>
        <button onClick={() => handlePlay(10)} disabled={isSleep > 0}>
          <Image
            alt="Happiness"
            src={happinessImage}
            width={50}
            height={50}
          ></Image>
        </button>
        <button onClick={() => handleSleep(100)} disabled={isSleep > 0}>
          <Image alt="Energy" src={energyImage} width={50} height={50}></Image>
        </button>

        <StyledPetContainer>
          {isSleep > 0 && (
            <StyledInteractionImage
              src={sleepingImage}
              alt="sleeping icon"
              height={50}
              width={50}
            />
          )}
          <StyledPetImage
            src={isDead ? graveImage : image}
            alt={type}
            height={150}
            width={150}
          />
        </StyledPetContainer>
      </StyledPetDetailPageMain>

      <StyledPetDetailPageFooter>
        <Link href="/">← Back to pets collection</Link>
      </StyledPetDetailPageFooter>
    </>
  );
}
