import Image from "next/image";
import styled from "styled-components";

const StyledInventoryContainer = styled.button`
  border: solid 2px ${({ $bordercolor }) => $bordercolor};
  border-radius: 10px;
  height: 100px;
  min-width: 100px;
  padding: 1px 0px;
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

const StyledName = styled.span`
  font-weight: bold;
  padding-top: 5px;
`;

export default function InventoryContainer({
  id,
  name,
  value,
  image,
  quantity,
  isActive,
  onClickOnItem,
  type,
}) {
  return (
    <StyledInventoryContainer
      $bordercolor={isActive ? "var(--accent-color)" : "lightgrey"}
      onClick={() => {
        onClickOnItem(id);
      }}
      type="button"
    >
      <Image src={image} alt={name} width={45} height={45} />

      {name !== undefined && <StyledName>{name}</StyledName>}

      {quantity !== undefined && (
        <StyledStats>quantity: {quantity}</StyledStats>
      )}

      {value !== undefined && (
        <StyledStats>
          {type}: {value}
        </StyledStats>
      )}
    </StyledInventoryContainer>
  );
}
