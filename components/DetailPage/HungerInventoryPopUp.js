import styled from "styled-components";
import Image from "next/image";
import StyledButton from "../StyledComponents/StyledButton";
import arrowLeft from "/public/assets/icons/round_arrow_back_ios_black.png";
import arrowRight from "/public/assets/icons/round_arrow_forward_ios_black.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { foods } from "@/lib/shop";
import InventoryContainer from "./InventoryContainer";

const HungerInventoryPopUpOverlay = styled.div`
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

const HungerInventoryPopUpContent = styled.div`
  background-color: var(--background-color);
  padding: 15px;
  max-width: 90vw;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  text-align: center;
`;

const StyledHungerInventoryContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
`;

const ConfirmPopUpButton = styled(StyledButton)`
  margin: 0 8px;
  background-color: ${({ $red }) => $red && "red"};
  cursor: pointer;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export default function HungerInventoryPopUp({
  userStats,
  onFeedButton,
  onCancel,
}) {
  const [selectedFoodItemId, setSelectedFoodItemId] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const availableFood = userStats.inventory.food.filter((fooditems) => {
    if (fooditems.value > 0) {
      return fooditems;
    }
  });

  function findFoodValuesById(id) {
    const food = foods.find((food) => food.id === id);
    return food;
  }

  function handleClickOnFoodItem(id) {
    setSelectedFoodItemId(id);
  }

  return (
    <HungerInventoryPopUpOverlay>
      <HungerInventoryPopUpContent>
        <p>What food item would you like to feed?</p>
        <StyledHungerInventoryContainer>
          {availableFood.map((fooditem) => (
            <InventoryContainer
              key={fooditem.id}
              id={fooditem.id}
              name={findFoodValuesById(fooditem.id).name}
              hunger={findFoodValuesById(fooditem.id).hunger}
              image={findFoodValuesById(fooditem.id).image}
              value={fooditem.value}
              isActive={fooditem.id === selectedFoodItemId}
              onClickOnFoodItem={handleClickOnFoodItem}
            />
          ))}
        </StyledHungerInventoryContainer>
        <ConfirmButtonWrapper>
          <ConfirmPopUpButton onClick={() => onFeedButton(selectedFoodItemId)}>
            Feed
          </ConfirmPopUpButton>
          <ConfirmPopUpButton $red onClick={onCancel}>
            Cancel
          </ConfirmPopUpButton>
        </ConfirmButtonWrapper>
      </HungerInventoryPopUpContent>
    </HungerInventoryPopUpOverlay>
  );
}
