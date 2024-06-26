import Image from "next/image";
import styled from "styled-components";

const StyledItemCard = styled.button`
  position: relative;
  border: solid 2px lightgray;
  border-radius: 10px;
  height: 100px;
  width: 100px;
  padding: 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2e8da;
  cursor: help;
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

export default function ItemCard({ name, image, quantity, description }) {
  return (
    <>
      <StyledItemCard type="button" title={`${name}\n${description}`}>
        <Image src={image} alt={name} width={40} height={40} />
        <StyledName>{name}</StyledName>
        {quantity !== undefined && (
          <StyledStats>quantity: {quantity}</StyledStats>
        )}
      </StyledItemCard>
    </>
  );
}
