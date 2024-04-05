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
`;

const StyledCountButton = styled(Image)`
  transform: scale(1);
  transition: 0.5s;

  &:hover {
    transform: scale(1.3);
    transition: 0.5s;
  }
`;

export default function BuyPopUp({ message, onBuy, onCancel }) {
  const [count, setCount] = useState(1);

  const decrementCount = () => {
    setCount((prevCount) => Math.math(prevCount - 1, 1));
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <BuyPopUpOverlay>
      <BuyPopUpContent>
        <p>{message}</p>
        <StyledCountButton
          onClick={decrementCount}
          src={arrowLeft}
          alt="subtract one item"
          width={50}
          height={50}
        />
        {count}
        <StyledCountButton
          onClick={incrementCount}
          src={arrowRight}
          alt="add one item"
          width={50}
          height={50}
        />
        <BuyButtonWrapper>
          {onBuy != null && (
            <BuyPopUpButton onClick={onBuy}>Buy</BuyPopUpButton>
          )}
          {onCancel != null && (
            <BuyPopUpButton $red onClick={onCancel}>
              Cancel
            </BuyPopUpButton>
          )}
        </BuyButtonWrapper>
      </BuyPopUpContent>
    </BuyPopUpOverlay>
  );
}
