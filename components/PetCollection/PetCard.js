import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledPetCard = styled.div`
  border: solid 2px black;
  border-radius: 10px;
  height: 80px;
  width: 80px;
  padding: 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const StyledName = styled.p`
  margin: 0;
`;

const StyledPetCardLink = styled(Link)`
  text-decoration: none;
`;

export default function PetCard({ myPet }) {
  return (
    <StyledPetCardLink href="/">
      <StyledPetCard>
        <Image src={myPet.image} alt={myPet.type} height={50} width={50} />
        <StyledName>{myPet.name}</StyledName>
      </StyledPetCard>
    </StyledPetCardLink>
  );
}
