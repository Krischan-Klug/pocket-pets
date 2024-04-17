import styled from "styled-components";
import StyledButton from "../StyledComponents/StyledButton";
import { useState } from "react";
import { foods } from "@/lib/shop";
import InventoryContainer from "./InventoryContainer";
import Link from "next/link";
import StyledPopUpOverlay from "@/components/StyledComponents/StyledPopUpOverlay";
import StyledPopUpContent from "@/components/StyledComponents/StyledPopUpContent";
import StyledInventoryContainer from "@/components/StyledComponents/StyledInventoryContainer";
import { useInventoryStore } from "@/hooks/stores/inventoryStore";

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

const StyledErrorMessage = styled.p`
  color: red;
`;

export default function HungerInventoryPopUp({
  onFeedButton,
  onCancel,
  petId,
}) {
  const [selectedFoodItemId, setSelectedFoodItemId] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const foodInventory = useInventoryStore((state) => state.foodInventory);

  const availableFood = foodInventory.filter((fooditems) => {
    if (fooditems.value > 0) {
      return fooditems;
    }
  });

  function handleConfirmButtonClick() {
    if (selectedFoodItemId === 0) {
      setShowErrorMessage(true);
    } else {
      onFeedButton(selectedFoodItemId);
      setSelectedFoodItemId(true);
    }
  }

  function findFoodValuesById(id) {
    const food = foods.find((food) => food.id === id);
    return food;
  }

  function handleClickOnFoodItem(id) {
    setSelectedFoodItemId(id);
    setShowErrorMessage(false);
  }

  return (
    <StyledPopUpOverlay>
      <StyledPopUpContent>
        <h3>What food item would you like to feed?</h3>
        <StyledInventoryContainer>
          {availableFood.map((fooditem) => (
            <InventoryContainer
              key={fooditem.id}
              id={fooditem.id}
              name={findFoodValuesById(fooditem.id).name}
              value={findFoodValuesById(fooditem.id).value}
              image={findFoodValuesById(fooditem.id).image}
              quantity={fooditem.value}
              isActive={fooditem.id === selectedFoodItemId}
              onClickOnItem={handleClickOnFoodItem}
              type="Hunger"
            />
          ))}
          {availableFood.length === 0 && (
            <>
              <p>
                You need to purchase food items from the shop first before you
                can feed them to your pet.
              </p>
              <Link href={`/${petId}/shop/`}>To Shop</Link>
            </>
          )}
        </StyledInventoryContainer>
        <ConfirmButtonWrapper>
          <ConfirmPopUpButton onClick={handleConfirmButtonClick}>
            Feed
          </ConfirmPopUpButton>
          <ConfirmPopUpButton $red onClick={onCancel}>
            Cancel
          </ConfirmPopUpButton>
        </ConfirmButtonWrapper>
        {showErrorMessage && (
          <StyledErrorMessage>
            You need to select a food item.
          </StyledErrorMessage>
        )}
      </StyledPopUpContent>
    </StyledPopUpOverlay>
  );
}
