import styled from "styled-components";
import Image from "next/image";
import StyledButton from "../StyledComponents/StyledButton";
import arrowLeft from "/public/assets/icons/round_arrow_back_ios_black.png";
import arrowRight from "/public/assets/icons/round_arrow_forward_ios_black.png";
import { useState } from "react";

const BuyPopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  //the height of the Z index should ensure that this popup is always the top element.
  //Since we work with the z-index in steps of 10, I have chosen 100 here.
  z-index: 100;
`;

const BuyPopUpContent = styled.div`
  background-color: var(--background-color);
  padding: 15px;
  max-width: 90vw;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  text-align: center;
`;

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
    <BuyPopUpOverlay>
      <BuyPopUpContent>
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
                if (cost * value < money) {
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
          <p>
            You have not enough money. You can earn money by playing minigames.
          </p>
        )}
      </BuyPopUpContent>
    </BuyPopUpOverlay>
  );
}
