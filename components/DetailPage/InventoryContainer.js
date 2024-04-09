import Image from "next/image";
import styled from "styled-components";

const StyledInventoryContainer = styled.button`
  border: solid 1px
    ${({ activeMode }) => (activeMode ? "var(--accent-color)" : "black")};
  border-radius: 10px;
  height: 80px;
  width: 80px;
  padding: 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledStats = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
`;

export default function InventoryContainer({
  key,
  name,
  hunger,
  image,
  value,
}) {
  //   function handleClickOnFoodItem(key) {
  //     if (activeMode) {
  //       setSelectedFoodId(key);
  //     } else {
  //       router.push(`/pet-detail-page/${id}`);
  //     }
  //   }

  return (
    <StyledInventoryContainer
      onClick={activeMode}
      //   onClick={() => {
      //     handleClickOnFoodItem(key);
      //   }}
      //   activeMode={activeMode}
    >
      <Image src={image} alt={name} />
      <StyledStats>{value}</StyledStats>
      <StyledStats>hunger: {hunger}</StyledStats>
    </StyledInventoryContainer>
  );
}
