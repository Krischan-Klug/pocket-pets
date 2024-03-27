import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import StatusBar from "@/components/DetailPage/StatusBar";

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
        <StyledEditButton>
          <Image
            src={"/../../public/assets/icon/edit_round_outline_black.png"}
            alt="edit button"
            height={20}
            width={20}
          />
        </StyledEditButton>
      </StyledPetDetailPageHeader>
      <StyledPetDetailPageMain>
        <h1>{name}</h1>
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
