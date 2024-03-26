import Image from "next/image";
import styled from "styled-components";
import trashcanIcon from "/public/assets/icons/round_delete_outline_black.png";

const StyledPetCard = styled.button`
  border: solid 2px ${({ deleteMode }) => (deleteMode ? "red" : "black")};
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

const StyledIcon = styled(Image)`
  position: absolute;
  top: 0;
  width: 70%;
  height: 70%;
`;

export default function PetCard({ myPet, deleteMode, handleClickOnPetCard }) {
  return (
    <>
      <StyledPetCard
        onClick={() => {
          handleClickOnPetCard(myPet.id);
        }}
        deleteMode={deleteMode}
      >
        {deleteMode && (
          <StyledIcon src={trashcanIcon} alt="Delete" height={70} width={70} />
        )}
        <Image src={myPet.image} alt={myPet.type} height={50} width={50} />
        <StyledName>{myPet.name}</StyledName>
      </StyledPetCard>
    </>
  );
}
