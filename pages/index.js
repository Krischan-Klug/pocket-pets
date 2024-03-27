import PetCard from "@/components/PetCollection/PetCard";
import styled from "styled-components";
import Link from "next/link";

const StyledPetCollectionHeader = styled.header`
  padding: 0px 30px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledPetCollectionWrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const StyledPetCollection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0px;
  width: 350px;
`;

export default function HomePage({ myPets }) {
  return (
    <>
      <StyledPetCollectionHeader>
        <h1>My Pets</h1>
        <Link href="/create">Create Pet</Link>
      </StyledPetCollectionHeader>
      <StyledPetCollectionWrapper>
        <StyledPetCollection>
          {myPets.map((myPet) => (
            <PetCard key={myPet.id} myPet={myPet} />
          ))}
        </StyledPetCollection>
      </StyledPetCollectionWrapper>
    </>
  );
}
