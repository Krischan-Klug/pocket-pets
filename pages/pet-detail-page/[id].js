import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";

const StyledPetDetailPageHeader = styled.header`
  padding: 0px 30px;
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
  margin: 40px 0px;
`;

const StyledPetDetailPageFooter = styled.footer`
  padding: 0px 30px;
  width: 100%;
  position: sticky;
  bottom: 20;
  z-index: 10;
`;

export default function PetDetailPage({ myPets }) {
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

  return (
    <>
      <StyledPetDetailPageHeader>
        <h1>{name}</h1>
      </StyledPetDetailPageHeader>
      <StyledPetDetailPageMain>
        <StatusBar text={"Health"} />
        <StatusBar text={"Hunger"} />
        <StatusBar text={"Happiness"} />
        <StatusBar text={"Energy"} />
        <StyledPetImage src={image} alt={type} height={150} width={150} />
      </StyledPetDetailPageMain>

      <StyledPetDetailPageFooter>
        <Link href="/">← Back to pets collection</Link>
      </StyledPetDetailPageFooter>
    </>
  );
}
