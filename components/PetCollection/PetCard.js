import Image from "next/image";
import styled from "styled-components";
import trashcanIcon from "/public/assets/icons/round_delete_outline_black.png";
import graveImage from "/public/assets/images/grave.png";

const StyledPetCard = styled.button`
  border: solid 2px ${({ $color }) => $color};
  border-radius: 10px;
  height: 110px;
  width: 110px;
  padding: 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  transition: 0.5s;
  background-color: rgb(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const StyledName = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
`;

const StyledDeleteIcon = styled(Image)`
  position: absolute;
  top: 0;
`;

export default function PetCard({ myPet, deleteMode, handleClickOnPetCard }) {
  return (
    <>
      <StyledPetCard
        onClick={() => {
          handleClickOnPetCard(myPet.id);
        }}
        $color={deleteMode ? "red" : "black"}
      >
        {deleteMode && (
          <StyledDeleteIcon
            src={trashcanIcon}
            alt="Delete"
            height={50}
            width={50}
          />
        )}
        <Image
          src={myPet.isDead ? graveImage : myPet.image}
          alt={myPet.type}
          height={70}
          width={70}
        />
        <StyledName>{myPet.name}</StyledName>
      </StyledPetCard>
    </>
  );
}
