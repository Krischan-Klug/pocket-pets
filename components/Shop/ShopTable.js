import MoneyImage from "../util/MoneyImage";
import HungerImage from "../util/HungerImage";
import ToyImage from "../util/ToyImage";
import Image from "next/image";
import styled from "styled-components";
import ClothesImage from "../util/ClothesImage";

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

const StyledShopTableWrapper = styled.div`
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2e8da;
  }
  &:nth-child(odd) {
    background-color: #e9ddcb;
  }

  &:hover {
    background-color: #e0d5c4;
  }

  td {
    border: 1px solid #d3c0a3;
  }
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
    case "clothes":
      typeIcon = <ClothesImage />;
      break;
    default:
      typeIcon = null;
      break;
  }

  return (
    <StyledShopTableWrapper>
      <table>
        <tbody>
          {data.map(
            (item) =>
              item.id > 0 && (
                <StyledTableRow
                  key={item.id}
                  onClick={() => onItemClick(item.id, item.cost)}
                >
                  <StyledTd width={60}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </StyledTd>
                  <StyledTd width={120}>{item.name}</StyledTd>
                  {item.value && (
                    <StyledTd width={60}>
                      <StyledImageContainer>
                        {item.value} {typeIcon}
                      </StyledImageContainer>
                    </StyledTd>
                  )}
                  <StyledTd width={60}>
                    <StyledImageContainer>
                      {item.cost} <MoneyImage />
                    </StyledImageContainer>
                  </StyledTd>
                </StyledTableRow>
              )
          )}
        </tbody>
      </table>
    </StyledShopTableWrapper>
  );
}
