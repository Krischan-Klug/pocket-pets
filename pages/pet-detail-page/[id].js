import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";
import { useEffect } from "react";
import { useState } from "react";

const StyledPetDetailPageHeader = styled.header`
  padding: 0 30px;
  width: 100%;
  display: flex;
  justify-content: center;
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

export default function PetDetailPage({ myPets, onGameUpdate }) {
  const [currentPet, setCurrentPet] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  //Gameloop for DEBUGING with 100ms later 10.000ms
  useEffect(() => {
    if (!id) return;

    const pet = myPets.find((myPet) => myPet.id == id);
    if (!pet) return;

    setCurrentPet(pet);

    const interval = setInterval(() => {
      onGameUpdate(id);
    }, 100);

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

  const { name, type, image } = currentPet;

  return (
    <>
      <StyledPetDetailPageHeader>
        <h1>{name}</h1>
      </StyledPetDetailPageHeader>
      <StyledPetDetailPageMain>
        <StatusBar text={"Health"} value={currentPet.health} />
        <StatusBar text={"Hunger"} value={currentPet.hunger} />
        <StatusBar text={"Happiness"} value={currentPet.happiness} />
        <StatusBar text={"Energy"} value={currentPet.energy} />
        <StyledPetImage src={image} alt={type} height={150} width={150} />
      </StyledPetDetailPageMain>

      <StyledPetDetailPageFooter>
        <Link href="/">← Back to pets collection</Link>
      </StyledPetDetailPageFooter>
    </>
  );
}
