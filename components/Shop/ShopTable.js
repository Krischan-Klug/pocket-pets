import MoneyImage from "../util/MoneyImage";
import HungerImage from "../util/HungerImage";
import Image from "next/image";
import styled from "styled-components";

const StyledTd = styled.td`
  width: ${(props) => props.width}px;
  text-align: center;
  height: 60px;
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 5px;
`;

export default function ShopTable({ data }) {
  return (
    <>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
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
                  {item.hunger} <HungerImage />
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
    </>
  );
}
