import Image from "next/image";
import styled from "styled-components";

const StyledInventoryContainer = styled.button`
  border: solid 2px ${({ $bordercolor }) => $bordercolor};
  border-radius: 10px;
  height: 87px;
  width: 87px;
  padding: 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledStats = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
`;

const StyledStatsValue = styled(StyledStats)`
  font-weight: bold;
`;

export default function InventoryContainer({
  id,
  name,
  hunger,
  image,
  value,
  isActive,
  onClickOnFoodItem,
}) {
  return (
    <StyledInventoryContainer
      $bordercolor={isActive ? "var(--accent-color)" : "lightgrey"}
      onClick={() => {
        onClickOnFoodItem(id);
      }}
    >
      <Image src={image} alt={name} width={50} height={50} />
      <StyledStatsValue>items: {value}</StyledStatsValue>
      <StyledStats>hunger: {hunger}</StyledStats>
    </StyledInventoryContainer>
  );
}
