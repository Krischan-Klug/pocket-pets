import styled from "styled-components";
import MoneyImage from "@/components/util/MoneyImage";

const StyledMoneyCounter = styled.p`
  position: absolute;
  bottom: 0;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default function MoneyCounter({ money }) {
  return (
    <StyledMoneyCounter>
      <MoneyImage />
      {money}
    </StyledMoneyCounter>
  );
}
