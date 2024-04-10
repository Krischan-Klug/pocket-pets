import MoneyImage from "../util/MoneyImage";
import HungerImage from "../util/HungerImage";
import ToyImage from "../util/ToyImage";
import Image from "next/image";
import styled from "styled-components";

const StyledTd = styled.td`
  width: ${(props) => props.width}px;
  text-align: center;
  height: 60px;
  cursor: pointer;
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 5px;
`;

const StyledShopTableWrapper = styled.section`
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function ShopTable({ data, onItemClick, category }) {
  let typeIcon;

  switch (category) {
    case "food":
      typeIcon = <HungerImage />;
      break;
    case "toy":
      typeIcon = <ToyImage />;
      break;
  }

  return (
    <StyledShopTableWrapper>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => onItemClick(item.id, item.cost)}>
              <StyledTd width={60}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </StyledTd>
              <StyledTd width={120}>{item.name}</StyledTd>
              <StyledTd width={60}>
                <StyledImageContainer>
                  {item.value} {typeIcon}
                </StyledImageContainer>
              </StyledTd>
              <StyledTd width={60}>
                <StyledImageContainer>
                  {item.cost} <MoneyImage />
                </StyledImageContainer>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledShopTableWrapper>
  );
}
