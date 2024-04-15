import styled from "styled-components";
import Image from "next/image";
import StyledButton from "../StyledComponents/StyledButton";
import arrowLeft from "/public/assets/icons/round_arrow_back_ios_black.png";
import arrowRight from "/public/assets/icons/round_arrow_forward_ios_black.png";
import { useState } from "react";

import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";

const BuyPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ $red }) => $red && "red"};
  cursor: pointer;
`;

const BuyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const StyledValueButton = styled(Image)`
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.3);
    transition: 0.5s;
  }
`;

const StyledText = styled.span`
  font-size: 25px;
  padding: 0 5px;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

export default function BuyPopUp({
  message,
  onBuy,
  onCancel,
  id,
  money,
  cost,
}) {
  const [value, setValue] = useState(1);
  const [budgetLimitReached, setBudgetLimitReached] = useState(false);

  const decrementValue = () => {
    setValue((prevValue) => Math.max(prevValue - 1, 1));
  };

  const incrementValue = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <StyledPopUpOverlay>
      <StyledPopUpContent>
        <p>{message}</p>
        <StyledValueButton
          onClick={decrementValue}
          src={arrowLeft}
          alt="subtract one item"
          width={20}
          height={20}
        />
        <StyledText>{value}</StyledText>
        <StyledValueButton
          onClick={incrementValue}
          src={arrowRight}
          alt="add one item"
          width={20}
          height={20}
        />
        <BuyButtonWrapper>
          {onBuy != null && (
            <BuyPopUpButton
              onClick={() => {
                if (cost * value <= money) {
                  onBuy(value, id, cost);
                } else {
                  setBudgetLimitReached(true);
                }
              }}
            >
              Buy
            </BuyPopUpButton>
          )}
          {onCancel != null && (
            <BuyPopUpButton $red onClick={onCancel}>
              Cancel
            </BuyPopUpButton>
          )}
        </BuyButtonWrapper>
        {budgetLimitReached !== false && (
          <StyledErrorMessage>
            You have not enough money to buy this many items.
          </StyledErrorMessage>
        )}
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}
